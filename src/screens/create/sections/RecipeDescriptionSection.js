import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { dimensions } from "../../../utils/dimensions";
import { colors } from "../../../themes/colors";

const RecipeDescriptionSection = ({ description, setDescription }) => {
  return (
    <View style={styles.section}>
      <View style={styles.row}>
        <Text style={styles.subTitle}>Descripción:</Text>
        {description.trim() === "" && <Text style={styles.obligatory}>*</Text>}
      </View>
      <TextInput
        style={[styles.input, { height: 120 }]}
        textAlignVertical="top"
        cursorColor={colors.primary}
        multiline={true}
        maxLength={200}
        value={description}
        onChangeText={(text) => setDescription(text)}
      />
    </View>
  );
};

export default RecipeDescriptionSection;

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
});
