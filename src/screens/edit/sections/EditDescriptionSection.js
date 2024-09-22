import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import Feather from "@expo/vector-icons/Feather";
import { dimensions } from "../../../utils/dimensions";
import { colors } from "../../../themes/colors";

const  EditDescriptionSection = ({ description, setDescription }) => {
  return (
    <View style={styles.section}>
      <View style={styles.row}>
        <Feather
          name="info"
          size={dimensions.iconSize}
          color={colors.onBackground}
        />
        <Text style={styles.subTitle}>Descripción:</Text>
      </View>
      <TextInput
        style={styles.input}
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

export default EditDescriptionSection;

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
