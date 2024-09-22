import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Platform,
  StatusBar,
  TouchableOpacity,
  Modal,
} from "react-native";
import React, { useContext, useState } from "react";
import { colors } from "../../themes/colors";
import { dimensions } from "../../utils/dimensions";
import PopButton from "../../components/PopButton";
import RecipeNameSection from "./sections/RecipeNameSection";
import RecipeDescriptionSection from "./sections/RecipeDescriptionSection";
import RecipeDifficultySection from "./sections/RecipeDifficultySection";
import RecipeServingsSection from "./sections/RecipeServingsSection";
import RecipeCategorySection from "./sections/RecipeCategorySection";
import RecipeImagesSection from "./sections/RecipeImagesSection";
import RecipeIngredientsSection from "./sections/RecipeIngredientsSection";
import BottomSheet from "../../components/BottomSheet";
import RecipeProceduresSection from "./sections/RecipeProceduresSection";
import BottomSheetProvider, {
  BottomSheetContext,
} from "../../context/BottomSheetProvider";
import LocalStorageServices from "../../services/LocalStorageServices";
import AuthServices from "../../services/AuthServices";
import { usePutRecipeMutation } from "../../services/recipe";
import uuid from "react-native-uuid";
import { usePutCreatedUserRecipeMutation } from "../../services/user";
import SuccessModal from "../../components/SuccessModal";
import StorageServices from "../../services/StorageServices";

const isIngredientEmpty = (ingredient) => {
  return (
    (ingredient.name === undefined || ingredient.name.trim() === "") &&
    (ingredient.quantity === undefined || ingredient.quantity.trim() === "") &&
    (ingredient.unit === undefined || ingredient.unit.trim() === "")
  );
};

const setInitIngredients = (initIngredients) => {
  if (initIngredients === undefined || initIngredients.length === 0)
    return [{}];
  const initI = [];
  for (const ingredient of initIngredients) {
    if (isIngredientEmpty(ingredient)) {
      continue;
    }
    initI.push(ingredient);
  }
  initI.push({});
  return initI;
};

const setInitProcedures = (initProcedures) => {
  if (initProcedures === undefined || initProcedures.length === 0)
    return [{ children: [{ type: "step" }] }];
  const initP = [];
  for (const procedure of initProcedures) {
    if (isProcedureEmpty(procedure)) {
      continue;
    }
    initP.push(procedure);
  }
  if (initP.length === 0) initP.push({ children: [{ type: "step" }] });
  return initP;
};

const isProcedureEmpty = (procedure) => {
  return (
    (procedure.title === undefined || procedure.title.trim() === "") &&
    (procedure.duration === undefined || procedure.duration.trim() === "") &&
    (procedure.children === undefined || isAllChildrenEmpty(procedure.children))
  );
};

const isAllChildrenEmpty = (children) => {
  for (const child of children) {
    if (!isChildEmpty(child)) {
      return false;
    }
  }
  return true;
};

const isChildEmpty = (child) => {
  return child.content === undefined || child.content.trim() === "";
};

const CreateRecipe = ({ route, navigation }) => {
  const { recipe } = route.params;

  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [disable, setDisable] = useState(false);

  const [triggerPutRecipe] = usePutRecipeMutation();
  const [triggerPutCreatedRecipe] = usePutCreatedUserRecipeMutation();

  const [name, setName] = useState(recipe.name || "");
  const [description, setDescription] = useState(recipe.description || "");
  const [difficulty, setDifficulty] = useState(recipe.difficulty || "");
  const [servings, setServings] = useState(recipe.servings || 0);
  const [categoryId, setCategoryId] = useState(recipe.categoryId || "");

  //blob elements fetch of uri elements, It is not persistent
  const [thumbnail, setThumbnail] = useState(undefined);
  const [images, setImages] = useState([]);

  const [ingredients, setIngredients] = useState(
    setInitIngredients(recipe.ingredients)
  );
  const [procedures, setProcedures] = useState(
    setInitProcedures(recipe.procedures)
  );

  const buildRecipe = (thumbnail, images) => {
    console.log(thumbnail, images);
    return {
      name,
      description,
      difficulty,
      servings,
      categoryId,
      thumbnail,
      images,
      ingredients,
      procedures,
    };
  };

  const buildDraftRecipe = () => {
    return {
      name,
      description,
      difficulty,
      servings,
      categoryId,
      ingredients,
      procedures,
    };
  };

  const postRecipe = () => {
    setDisable(true);
    const id = uuid.v4();
    StorageServices.putRecipeImages({
      recipeId: id,
      thumbnail: thumbnail,
      images: images,
      onError: () => setDisable(false),
      onSuccess: ({ thumbnail, images }) => {
        AuthServices.getCurrentAuthUser()
          .getIdToken()
          .then((idToken) => {
            Promise.all([
              triggerPutRecipe({
                idToken,
                id,
                recipe: buildRecipe(thumbnail, images),
              }).unwrap(),
              triggerPutCreatedRecipe({
                id,
                idToken,
              }).unwrap(),
            ])
              .then(() => {
                setSuccessModalVisible(true);
                LocalStorageServices.removeItem({
                  key: "@MikuyUserActivity/draftRecipe",
                  onFinally: () => {
                    setTimeout(() => {
                      navigation.goBack();
                    }, 2000);
                  },
                });
              })
              .finally(() => {
                setDisable(false);
              });
          });
      },
    });
  };

  const saveDraftRecipe = () => {
    LocalStorageServices.setItem({
      key: "@MikuyUserActivity/draftRecipe",
      value: buildDraftRecipe(),
      isObject: true,
      onSuccess: () => navigation.goBack(),
    });
  };

  return (
    <BottomSheetProvider>
      <View style={styles.createRecipe}>
        <View style={styles.appBarContainer}>
          <View style={styles.statusBar} />
          <View style={styles.appBar}>
            <PopButton style={styles.popButton} />
            <Text style={styles.titleScreen}>AGREGAR UNA RECETA</Text>
          </View>
        </View>
        <ScrollView
          contentContainerStyle={styles.layout}
          style={{ flex: 1 }}
          keyboardDismissMode="on-drag"
          overScrollMode="never"
          showsVerticalScrollIndicator={false}
        >
          <RecipeNameSection name={name} setName={setName} />
          <RecipeDescriptionSection
            description={description}
            setDescription={setDescription}
          />
          <RecipeDifficultySection
            difficulty={difficulty}
            setDifficulty={setDifficulty}
          />
          <View style={styles.row}>
            <RecipeServingsSection
              servings={servings}
              setServings={setServings}
            />
            <RecipeCategorySection
              categoryId={categoryId}
              setCategoryId={setCategoryId}
            />
          </View>
          <RecipeImagesSection
            setThumbnail={setThumbnail}
            setImages={setImages}
          />
          <RecipeIngredientsSection
            ingredients={ingredients}
            setIngredients={setIngredients}
          />
          <RecipeProceduresSection
            procedures={procedures}
            setProcedures={setProcedures}
          />
        </ScrollView>
        <View style={styles.submitContainer}>
          <TouchableOpacity
            disabled={disable}
            activeOpacity={0.85}
            style={styles.submitButton}
            onPress={() => postRecipe()}
          >
            <Text style={styles.submitButtonLabel}>Publicar receta</Text>
          </TouchableOpacity>
          <TouchableOpacity
            disabled={disable}
            activeOpacity={0.85}
            style={[styles.submitButton, { backgroundColor: colors.surface }]}
            onPress={() => saveDraftRecipe()}
          >
            <Text
              style={[styles.submitButtonLabel, { color: colors.onBackground }]}
            >
              Continuar luego
            </Text>
          </TouchableOpacity>
        </View>
        <CreateRecipeBottomSheet />
        <Modal
          animationType="fade"
          transparent={true}
          visible={successModalVisible}
          statusBarTranslucent
        >
          <SuccessModal title={"Receta guardada con éxito"} />
        </Modal>
      </View>
    </BottomSheetProvider>
  );
};

const CreateRecipeBottomSheet = () => {
  const { bottomSheetRef, sheetContent } = useContext(BottomSheetContext);
  return <BottomSheet ref={bottomSheetRef}>{sheetContent}</BottomSheet>;
};

const styles = StyleSheet.create({
  createRecipe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  layout: {
    gap: dimensions.layoutVerticalGap,
    paddingHorizontal: dimensions.layoutHorizontalPadding,
    paddingVertical: dimensions.layoutVerticalPadding,
  },
  statusBar: {
    height: Platform.OS === "android" ? StatusBar.currentHeight || 0 : 0,
  },
  appBar: {
    paddingVertical: dimensions.layoutVerticalPadding,
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
  },
  popButton: {
    position: "absolute",
    left: dimensions.layoutHorizontalPadding,
    alignSelf: "center",
  },
  row: {
    flexDirection: "row",
    flex: 1,
  },
  titleScreen: {
    fontFamily: "PoppinsBold",
    fontSize: dimensions.fontSizeTitle,
    color: colors.primary,
  },
  submitContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: dimensions.sectionHorizontalGap,
    paddingHorizontal: dimensions.layoutHorizontalPadding,
    paddingVertical: dimensions.layoutVerticalPadding,
  },
  submitButton: {
    paddingHorizontal: dimensions.sectionHorizontalPadding,
    paddingVertical: dimensions.sectionVerticalPadding,
    borderRadius: dimensions.sectionBorderRadius,
    backgroundColor: colors.primary,
  },
  submitButtonLabel: {
    fontFamily: "PoppinsBold",
    fontSize: dimensions.fontSizeSubTitle,
    color: colors.onPrimary,
  },
});

export default CreateRecipe;
