import { TouchableOpacity, StyleSheet, Text, View } from "react-native";
import React from "react";
import { dimensions } from "../utils/dimensions";
import { colors } from "../themes/colors";
import Entypo from "@expo/vector-icons/Entypo";

const CreateRecipeModal = ({ onConfirm, onDiscard }) => {
  return (
    <View style={styles.createModal}>
      <Text style={styles.title}>
        Tienes una receta guardada,{"\n"}¿deseas continuar o descartar la
        receta?
      </Text>
      <View style={styles.row}>
        <TouchableOpacity
          activeOpacity={0.85}
          style={styles.button}
          onPress={() => onConfirm?.()}
        >
          <Entypo
            name="chevron-right"
            size={dimensions.iconSize}
            color={colors.onPrimary}
          />
          <Text style={styles.subTitle}>Continuar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.85}
          style={[styles.button, { backgroundColor: colors.background }]}
          onPress={() => onDiscard?.()}
        >
          <Text style={[styles.subTitle, { color: colors.onBackground }]}>
            Descartar
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CreateRecipeModal;

const styles = StyleSheet.create({
  createModal: {
    gap: dimensions.sectionHorizontalGap,
    paddingVertical: dimensions.layoutVerticalPadding,
    paddingHorizontal: dimensions.layoutHorizontalPadding,
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    gap: dimensions.sectionHorizontalGap,
  },
  title: {
    fontFamily: "PoppinsBold",
    fontSize: dimensions.fontSizeTitle,
    color: colors.primary,
    textAlign: "center",
  },
  subTitle: {
    fontFamily: "PoppinsMedium",
    fontSize: dimensions.fontSizeSubTitle,
    color: colors.onPrimary,
    textAlign: "center",
  },
  button: {
    flexDirection: "row",
    backgroundColor: colors.primary,
    gap: dimensions.sectionHorizontalGap,
    paddingVertical: dimensions.sectionVerticalPadding,
    paddingHorizontal: dimensions.sectionHorizontalPadding,
    borderRadius: dimensions.sectionBorderRadius,
    borderWidth: 2,
    borderColor: colors.primary,
  },
});
