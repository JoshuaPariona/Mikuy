import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { dimensions } from "../../../utils/dimensions";
import { colors } from "../../../themes/colors";

const EditExperienceSection = ({ experience, setExperience }) => {
  return (
    <View style={styles.section}>
      <View style={styles.row}>
        <MaterialCommunityIcons
          name="chef-hat"
          size={dimensions.iconSize}
          color={colors.onBackground}
        />
        <Text style={styles.subTitle}>Experiencia profesional:</Text>
      </View>
      <TextInput
        style={styles.input}
        textAlignVertical="top"
        cursorColor={colors.primary}
        multiline={true}
        maxLength={200}
        value={experience}
        onChangeText={(text) => setExperience(text)}
      />
    </View>
  );
};

export default EditExperienceSection;

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
