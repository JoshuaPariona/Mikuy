import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { dimensions } from "../../../utils/dimensions";
import { colors } from "../../../themes/colors";

const isIngredientEmpty = (ingredient) => {
  return (
    (ingredient.name === undefined || ingredient.name.trim() === "") &&
    (ingredient.quantity === undefined || ingredient.quantity.trim() === "") &&
    (ingredient.unit === undefined || ingredient.unit.trim() === "")
  );
};

const isAllIngredientsEmpty = (ingredients) => {
  for (const ingredient of ingredients) {
    if (!isIngredientEmpty(ingredient)) {
      return false;
    }
  }
  return true;
};

const RecipeIngredientsSection = ({ ingredients, setIngredients }) => {

  const handleIngredientChange = (index, text, key) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[index] = {
      ...updatedIngredients[index],
      [key]: text,
    };
    if (ingredients.length - 1 === index) {
      updatedIngredients.push({});
    }
    setIngredients(updatedIngredients);
  };

  const handleIngredientDelete = (index) => {
    if (ingredients.length <= 1) return;
    if (ingredients.length - 1 === index) return;
    const updatedIngredients = [...ingredients];
    if (index >= 0 && index < updatedIngredients.length) {
      updatedIngredients.splice(index, 1);
      setIngredients(updatedIngredients);
    }
  };

  return (
    <View style={styles.section}>
      <View style={styles.row}>
        <Text style={styles.subTitle}>Ingredientes:</Text>
        {isAllIngredientsEmpty(ingredients) && (
          <Text style={styles.obligatory}>*</Text>
        )}
      </View>
      <View style={styles.header}>
        <Text style={[styles.label, styles.headerColumn1]}>Nombre:</Text>
        <Text style={[styles.label, styles.headerColumn2]}>Cantidad:</Text>
        <Text style={[styles.label, styles.headerColumn3]}>Unidad:</Text>
        <Text style={{ width: dimensions.smallIconSize }} />
      </View>
      {ingredients.map((item, index) => (
        <IngredientEntry
          key={`key-${index * 1}`}
          ingredient={item}
          index={index}
          onIngredientChange={handleIngredientChange}
          handleDelete={handleIngredientDelete}
          isLast={index === ingredients.length - 1}
        />
      ))}
    </View>
  );
};

const IngredientEntry = ({
  ingredient = {},
  index,
  onIngredientChange,
  handleDelete,
  isLast,
}) => {
  return (
    <View style={styles.header}>
      <View style={styles.headerColumn1}>
        <TextInput
          style={styles.input}
          cursorColor={colors.primary}
          maxLength={30}
          value={ingredient.name}
          onChangeText={(text) => {
            onIngredientChange(index, text, "name");
          }}
        />
      </View>
      <View style={styles.headerColumn2}>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          cursorColor={colors.primary}
          maxLength={6}
          value={ingredient.quantity}
          onChangeText={(text) => {
            onIngredientChange(index, text, "quantity");
          }}
        />
      </View>
      <View style={styles.headerColumn3}>
        <TextInput
          style={styles.input}
          cursorColor={colors.primary}
          maxLength={8}
          value={ingredient.unit}
          onChangeText={(text) => {
            onIngredientChange(index, text, "unit");
          }}
        />
      </View>
      {isLast ? (
        <View style={{ width: dimensions.smallIconSize }} />
      ) : (
        <Pressable hitSlop={5} onPress={() => handleDelete(index)}>
          <AntDesign
            name="minuscircle"
            size={dimensions.smallIconSize}
            color={colors.primary}
          />
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    gap: dimensions.sectionVerticalGap,
  },
  row: {
    gap: dimensions.sectionHorizontalGap,
    flexDirection: "row",
    alignItems: "center",
  },
  subTitle: {
    fontFamily: "PoppinsMedium",
    fontSize: dimensions.fontSizeSubTitle,
    color: colors.onBackground,
  },
  obligatory: {
    color: colors.error,
  },
  input: {
    borderRadius: dimensions.sectionBorderRadius,
    paddingHorizontal: dimensions.sectionHorizontalPadding,
    paddingVertical: dimensions.sectionVerticalPadding,

    fontFamily: "PoppinsRegular",
    fontSize: dimensions.fontSizeSubTitle,
    color: colors.onBackground,

    backgroundColor: colors.surface,
  },
  label: {
    fontFamily: "PoppinsRegular",
    fontSize: dimensions.fontSizeSubTitle,
    color: colors.onBackground,
  },
  header: {
    gap: dimensions.sectionHorizontalGap,
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  headerColumn1: {
    flex: 4,
  },
  headerColumn2: {
    flex: 2,
  },
  headerColumn3: {
    flex: 2,
  },
});

export default RecipeIngredientsSection;
