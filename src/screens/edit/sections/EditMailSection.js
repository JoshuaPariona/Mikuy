import { View, Text, StyleSheet, TextInput } from "react-native";
import React from "react";
import { colors } from "../../../themes/colors";
import { dimensions } from "../../../utils/dimensions";
import Ionicons from "@expo/vector-icons/Ionicons";

const EditMailSection = ({ socialNet, setSocialNet }) => {
  return (
    <View style={styles.section}>
      <View style={styles.row}>
        <Ionicons
          name="mail-outline"
          size={dimensions.iconSize}
          color={colors.onBackground}
        />
        <Text style={styles.subTitle}>Contacto:</Text>
      </View>
      <TextInput
        style={styles.input}
        cursorColor={colors.primary}
        maxLength={60}
        value={socialNet.email}
        onChangeText={(text) =>
          setSocialNet({ ...socialNet, email: text.trim() })
        }
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

export default EditMailSection;
