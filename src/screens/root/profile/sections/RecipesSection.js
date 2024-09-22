import {
  View,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useState } from "react";
import { dimensions } from "../../../../utils/dimensions";
import { colors } from "../../../../themes/colors";
import {
  useGetRecipeCategoriesQuery,
  useGetRecipeByIdQuery,
} from "../../../../services/recipe";
import { useGetCurrentUserQuery } from "../../../../services/user";
import { useNavigation } from "@react-navigation/native";
import { BottomSheetContext } from "../../../../context/BottomSheetProvider";
import Feather from "@expo/vector-icons/Feather";
import LocalStorageServices from "../../../../services/LocalStorageServices";
import CreateRecipeModal from "../../../../components/CreateRecipeModal";
import NoRecipes from "../../components/NoRecipes"
import RecipeItemDetailed from "../../components/RecipeItemDetailed";

const RecipesSection = () => {
  const { setSheetContent, openBottomSheet, closeBottomSheet } =
    useContext(BottomSheetContext);
  const { data: user, isLoading: isLoadingUser } = useGetCurrentUserQuery();
  const navigation = useNavigation();

  const handleResumeRecipe = (item) => {
    closeBottomSheet();
    navigation.navigate("create", { recipe: item });
  };

  const handleDiscardRecipe = () => {
    LocalStorageServices.removeItem({
      key: "@MikuyUserActivity/draftRecipe",
      onSuccess: () => {
        closeBottomSheet();
        navigation.navigate("create", { recipe: {} });
      },
      //onFinally: () => navigation.navigate("create", { recipe: {} }),
    });
  };

  const handleCreateModal = (item) => {
    setSheetContent(
      <CreateRecipeModal
        key={"createModal"}
        onConfirm={() => handleResumeRecipe(item)}
        onDiscard={() => handleDiscardRecipe()}
      />
    );
    openBottomSheet();
  };

  const handleCreateRecipe = () => {
    LocalStorageServices.getItem({
      key: "@MikuyUserActivity/draftRecipe",
      isObject: true,
      onSuccess: (item) => handleCreateModal(item),
      onNotFound: () => navigation.navigate("create", { recipe: {} }),
    });
  };

  if (isLoadingUser) {
    return <View />;
  }

  return (
    <View style={styles.layout}>
      <View style={styles.row}>
        <Text
          style={styles.recipes}
        >{`Recetas (${user.createdRecipes?.length})`}</Text>
        <Pressable hitSlop={5} onPress={() => handleCreateRecipe()}>
          <Text style={styles.new}>+ Nueva Receta</Text>
        </Pressable>
      </View>
      {(user.createdRecipes?.length ?? 0) === 0 ? (
        <NoRecipes
          title="No has publicado recetas aun,"
          subTitle="¡Vamos, crea una nueva receta!"
        />
      ) : (
        <CreatedRecipe createdRecipes={user.createdRecipes} />
      )}
    </View>
  );
};

const CreatedRecipe = ({ createdRecipes = [] }) => {
  const { data: categories, isLoading } = useGetRecipeCategoriesQuery();
  const [currentCategoryId, setCurrentCategoryId] = useState("all-category");

  if (isLoading) {
    return <View />;
  }

  return (
    <View style={styles.layout}>
      <CategoriesCarousel
        currentCategoryId={currentCategoryId}
        setCurrentCategoryId={setCurrentCategoryId}
        data={categories}
      />
      <FilteredRecipes
        currentCategoryId={currentCategoryId}
        createdRecipes={createdRecipes}
      />
    </View>
  );
};

const FilteredRecipes = ({ createdRecipes, currentCategoryId }) => {
  //<Text>No se encontraron recetas de esta categoría</Text>
  return (
    <View style={styles.layout}>
      {createdRecipes.map((recipeId) => (
        <RecipeCategoryWrapper
          key={recipeId}
          recipeId={recipeId}
          currentCategoryId={currentCategoryId}
        />
      ))}
    </View>
  );
};

const RecipeCategoryWrapper = ({ recipeId = "", currentCategoryId }) => {
  const { data: recipe, isLoading } = useGetRecipeByIdQuery(recipeId);

  if (isLoading) {
    return null;
  }

  if (
    currentCategoryId !== "all-category" &&
    recipe.categoryId !== currentCategoryId
  ) {
    return null;
  }

  return <RecipeItemDetailed recipeId={recipeId} />;
};

const CategoryItem = ({ item, currentCategoryId, onSelect }) => {
  return (
    <View style={styles.categoryCard}>
      <TouchableOpacity
        activeOpacity={0.85}
        style={styles.categoryButton}
        onPress={() => onSelect(item.id)}
      >
        {item.id === "all-category" ? (
          <View style={styles.categoryIcon}>
            <Feather
              name="layers"
              size={dimensions.iconSize}
              color={colors.onPrimary}
            />
          </View>
        ) : (
          <Image
            style={styles.categoryIcon}
            source={{
              uri: item.image,
            }}
          />
        )}
      </TouchableOpacity>

      <Text
        style={[
          styles.subTitle,
          currentCategoryId === item.id ? { color: colors.primary } : {},
        ]}
      >
        {item.name}
      </Text>
    </View>
  );
};

const CategoriesCarousel = ({
  data = [],
  currentCategoryId,
  setCurrentCategoryId,
}) => {
  const categories = [{ id: "all-category", name: "Todos" }, ...data];
  return (
    <FlatList
      key={"categories"}
      keyExtractor={(item) => item.id}
      data={categories}
      renderItem={({ item }) => (
        <CategoryItem
          key={item.id}
          item={item}
          currentCategoryId={currentCategoryId}
          onSelect={(id) => setCurrentCategoryId(id)}
        />
      )}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      overScrollMode="never"
      ItemSeparatorComponent={
        <View style={{ width: dimensions.layoutHorizontalGap }}></View>
      }
    />
  );
};

const styles = StyleSheet.create({
  layout: {
    gap: dimensions.layoutVerticalGap,
    width: "100%",
  },
  section: {
    gap: dimensions.sectionVerticalGap,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  recipes: {
    fontFamily: "PoppinsMedium",
    fontSize: dimensions.fontSizeTitle,
    color: colors.primary,
  },
  new: {
    fontFamily: "PoppinsBold",
    fontSize: dimensions.fontSizeSubTitle,
    color: colors.onTertiary,
  },
  subTitle: {
    fontFamily: "PoppinsRegular",
    fontSize: dimensions.fontSizeSubTitle,
    color: colors.onBackground,
  },
  categoryCard: {
    alignItems: "center",
    gap: dimensions.subSectionVerticalGap,
  },
  categoryButton: {
    height: 70,
    width: 70,
    borderRadius: 70,
    overflow: "hidden",
  },
  categoryIcon: {
    height: 70,
    width: 70,
    borderRadius: 70,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primary,
  },
});

export default RecipesSection;
