import { Pressable, StyleSheet } from "react-native";
import React, { useContext } from "react";
import { dimensions } from "../utils/dimensions";
import { colors } from "../themes/colors";
import AntDesign from "@expo/vector-icons/AntDesign";
import { BottomSheetContext } from "../context/BottomSheetProvider";
import ComingSoonModal from "./ComingSoonModal";

const EditRecipeButton = ({ recipe }) => {
  const { setSheetContent, openBottomSheet } = useContext(BottomSheetContext);

  const handleEditRecipe = () => {
    setSheetContent(
      <ComingSoonModal
        title={`La edición de la receta ${recipe.name}, estará disponible pronto. 😅`}
      />
    );
    openBottomSheet();
  };

  return (
    <Pressable hitSlop={5} onPress={handleEditRecipe}>
      <AntDesign
        name="edit"
        size={dimensions.iconSize}
        color={colors.primary}
      />
    </Pressable>
  );
};

export default EditRecipeButton;

const styles = StyleSheet.create({});
