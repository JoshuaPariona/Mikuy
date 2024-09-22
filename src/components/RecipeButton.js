import { Pressable } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const RecipeButton = ({ recipeId, children }) => {
  const navigation = useNavigation();

  const handleNavigationRecipe = () => {
    navigation.navigate("recipe", { id: recipeId });
  };

  return <Pressable onPress={handleNavigationRecipe}>{children}</Pressable>;
};

export default RecipeButton;
