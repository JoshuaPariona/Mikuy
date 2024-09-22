import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { images } from "../../../utils/images";
import { dimensions } from "../../../utils/dimensions";
import { colors } from "../../../themes/colors";

const NoRecipes = ({ title = "", subTitle = "" }) => {
  return (
    <View style={{ gap: dimensions.sectionVerticalGap, alignItems: "center" }}>
      <Image style={styles.noRecipes} source={images.noRecipes} />
      <Text style={styles.title}>
        {title}
        {"\n"}
        <Text style={styles.subTitle}>{subTitle}</Text>
      </Text>
    </View>
  );
};

export default NoRecipes;

const styles = StyleSheet.create({
  noRecipes: {
    height: 200,
    width: 300,
  },
  title: {
    fontFamily: "PoppinsMedium",
    fontSize: dimensions.fontSizeTitle,
    color: colors.primary,
    textAlign: "center",
  },
  subTitle: {
    fontFamily: "PoppinsRegular",
    fontSize: dimensions.fontSizeSubTitle,
    color: colors.onBackground,
  },
});
