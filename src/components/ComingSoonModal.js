import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { dimensions } from "../utils/dimensions";
import { colors } from "../themes/colors";

const ComingSoonModal = ({ title }) => {
  return (
    <View style={styles.comingModal}>
      <Text style={styles.title}>
        {title || "Esta sección estará disponible más adelante. 😅"}
      </Text>
    </View>
  );
};

export default ComingSoonModal;

const styles = StyleSheet.create({
  comingModal: {
    gap: dimensions.sectionVerticalGap,
    paddingVertical: dimensions.layoutVerticalPadding,
    paddingHorizontal: dimensions.layoutHorizontalPadding,
    alignItems: "center",
  },
  title: {
    fontFamily: "PoppinsBold",
    fontSize: dimensions.fontSizeTitle,
    color: colors.primary,
    textAlign: "center",
  },
});
