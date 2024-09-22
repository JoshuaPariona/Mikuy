import { Pressable, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { dimensions } from "../utils/dimensions";
import { colors } from "../themes/colors";

const AddButton = ({ style, onPress }) => {
  return (
    <Pressable style={style} hitSlop={5} onPress={() => onPress?.()}>
      <Ionicons
        name="add-circle"
        size={dimensions.iconSize}
        color={colors.primary}
      />
    </Pressable>
  );
};

export default AddButton;

const styles = StyleSheet.create({});
