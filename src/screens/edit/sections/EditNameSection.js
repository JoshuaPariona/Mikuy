import { View, Text, StyleSheet, TextInput } from "react-native";
import React from "react";
import { colors } from "../../../themes/colors";
import { dimensions } from "../../../utils/dimensions";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

const EditNameSection = ({ name, setName }) => {
  return (
    <View style={styles.section}>
      <View style={styles.row}>
        <FontAwesome5
          name="user"
          size={dimensions.iconSize}
          color={colors.onBackground}
        />
        <Text style={styles.subTitle}>Nombre de usuario:</Text>
      </View>
      <TextInput
        style={styles.input}
        cursorColor={colors.primary}
        maxLength={60}
        value={name}
        onChangeText={(text) => setName(text)}
      />
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

export default EditNameSection;
