import { FlatList, StyleSheet, View } from "react-native";
import React, { useContext } from "react";
import {
  useGetRecipeByIdQuery,
  useGetRecipesGeneralIdsQuery,
} from "../../../services/recipe";
import { dimensions } from "../../../utils/dimensions";
import RecipeItemDetailed from "../components/RecipeItemDetailed";
import { SearchInputContext } from "../../../context/SearchInputProvider";

const CookBook = () => {
  const { data: recipeIds, isLoading } = useGetRecipesGeneralIdsQuery();

  if (isLoading) return <View />;

  return (
    <FlatList
      key={"cookbook"}
      keyboardDismissMode="on-drag"
      contentContainerStyle={styles.layout}
      showsVerticalScrollIndicator={false}
      overScrollMode="never"
      data={recipeIds}
      keyExtractor={(item) => item}
      renderItem={({ item }) => <RecipeFilterWrapper recipeId={item} />}
    />
  );
};

const RecipeFilterWrapper = ({ recipeId = "" }) => {
  const { data: recipe, isLoading } = useGetRecipeByIdQuery(recipeId);
  const { input, category, difficulty, servings, duration, averageRating } =
    useContext(SearchInputContext);

  if (isLoading) {
    return null;
  }

  if (category !== "all-category" && recipe.categoryId !== category) {
    return null;
  }

  if (difficulty !== "" && recipe.difficulty !== difficulty) {
    return null;
  }

  if (servings !== 0 && recipe.servings !== servings) {
    return null;
  }

  if (duration !== 0 && recipe.duration > duration) {
    return null;
  }

  if (
    averageRating !== 0 &&
    (!recipe.rating ||
      recipe.rating.averageRating === undefined ||
      recipe.rating.averageRating < averageRating)
  ) {
    return null;
  }

  if (!recipe.name?.toLowerCase().includes(input.toLowerCase())) {
    return null;
  }

  return (
    <View style={styles.item}>
      <RecipeItemDetailed recipeId={recipeId} />
    </View>
  );
};

const styles = StyleSheet.create({
  layout: {
    paddingTop: dimensions.layoutVerticalGap,
    paddingHorizontal: dimensions.layoutHorizontalPadding,
  },
  item: {
    paddingBottom: dimensions.layoutVerticalGap,
  },
});

export default CookBook;
