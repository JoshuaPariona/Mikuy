import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { dimensions } from "../../../utils/dimensions";
import { colors } from "../../../themes/colors";

const EditAboutMeSection = ({ aboutMe, setAboutMe }) => {
  return (
    <View style={styles.section}>
      <View style={styles.row}>
        <Ionicons
          name="book-outline"
          size={dimensions.iconSize}
          color={colors.onBackground}
        />
        <Text style={styles.subTitle}>Sobre mí:</Text>
      </View>
      <TextInput
        style={styles.input}
        textAlignVertical="top"
        cursorColor={colors.primary}
        multiline={true}
        maxLength={200}
        value={aboutMe}
        onChangeText={(text) => setAboutMe(text)}
      />
    </View>
  );
};

export default EditAboutMeSection;

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
