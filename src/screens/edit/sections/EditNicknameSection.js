import { View, Text, StyleSheet, TextInput } from "react-native";
import React from "react";
import { colors } from "../../../themes/colors";
import { dimensions } from "../../../utils/dimensions";
import AntDesign from '@expo/vector-icons/AntDesign';

const EditNicknameSection = ({ nickname, setNickname }) => {
  return (
    <View style={styles.section}>
      <View style={styles.row}>
      <AntDesign name="tago" 
          size={dimensions.iconSize}
          color={colors.onBackground}
        />
        <Text style={styles.subTitle}>Tag de usuario:</Text>
      </View>
      <TextInput
        style={styles.input}
        cursorColor={colors.primary}
        maxLength={20}
        value={nickname}
        onChangeText={(text) => setNickname(text.replace(/[@ ]/g,""))}
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

export default EditNicknameSection;