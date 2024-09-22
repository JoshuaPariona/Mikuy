import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { dimensions } from "../../../utils/dimensions";
import { colors } from "../../../themes/colors";

const RecipeServingsSection = ({ servings, setServings }) => {
  return (
    <View style={[styles.section, { flex: 1 }]}>
      <View style={styles.row}>
        <Text style={styles.subTitle}>Porciones:</Text>
        {servings <= 0 && <Text style={styles.obligatory}>*</Text>}
      </View>
      <View style={styles.row}>
        <TextInput
          style={styles.inputNumber}
          cursorColor={colors.primary}
          maxLength={2}
          keyboardType="numeric"
          value={String(servings)}
          textAlign="center"
          onChangeText={(text) => {
            const parsedText = parseInt(text.trim(), 10);
            setServings(isNaN(parsedText) ? 0 : parsedText);
          }}
        />
        <Text style={styles.label}>porc.</Text>
      </View>
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
  inputNumber: {
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
});

export default RecipeServingsSection;
