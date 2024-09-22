import { Platform, StatusBar, StyleSheet, View, Animated } from "react-native";
import React from "react";
import { dimensions } from "../../../utils/dimensions";
import { colors } from "../../../themes/colors";
import AnimatedBackGroundColorStepView from "../../../components/animated/AnimatedBackGroundColorStepView";
import { useGetRecipeCategoriesQuery } from "../../../services/recipe";

const TitleSection = ({ recipe, scrollOffsetY }) => {
  const { data: categories, isLoading } = useGetRecipeCategoriesQuery();

  if (isLoading) return <View></View>;

  const styleTitleColor = {
    color: scrollOffsetY.interpolate({
      inputRange: [0, 450],
      outputRange: [colors.onBackground, colors.onPrimary],
      extrapolate: "clamp",
    }),
  };

  const styleSubTitleColor = {
    color: scrollOffsetY.interpolate({
      inputRange: [0, 450],
      outputRange: [colors.onTertiary, colors.onPrimary],
      extrapolate: "clamp",
    }),
  };

  const styleTopPadding = {
    height: scrollOffsetY.interpolate({
      inputRange: [0, 450],
      outputRange: [
        0,
        Platform.OS === "android"
          ? StatusBar.currentHeight || 0
          : dimensions.layoutVerticalPadding,
      ],
      extrapolate: "clamp",
    }),
  };

  return (
    <AnimatedBackGroundColorStepView
      style={styles.titleSection}
      step={scrollOffsetY}
      range={450}
      startColor={colors.background}
      endColor={colors.primary}
    >
      <Animated.View style={styleTopPadding} />
      <View style={styles.header}>
        <Animated.Text style={[styles.bigTitle, styleTitleColor]}>
          {recipe.name || ""}
        </Animated.Text>
        <Animated.Text style={[styles.rating, styleSubTitleColor]}>
          {`☆ ${recipe?.rating?.averageRating ?? 0.0}`}
        </Animated.Text>
      </View>
      <Animated.Text style={[styles.category, styleSubTitleColor]}>
        {categories.find((cat) => cat.id === recipe?.categoryId)?.name}
      </Animated.Text>
    </AnimatedBackGroundColorStepView>
  );
};

export default TitleSection;

const styles = StyleSheet.create({
  titleSection: {
    backgroundColor: colors.background,
    paddingHorizontal: dimensions.layoutHorizontalPadding,
    paddingVertical: dimensions.layoutVerticalPadding,
    borderTopLeftRadius: dimensions.layoutBorderRadius,
    borderTopRightRadius: dimensions.layoutBorderRadius,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  bigTitle: {
    fontFamily: "PoppinsBold",
    fontSize: dimensions.fontSizeTitle,
    color: colors.onBackground,
  },
  rating: {
    fontFamily: "PoppinsMedium",
    fontSize: dimensions.fontSizeSubTitle,
    color: colors.onTertiary,
  },
  category: {
    fontFamily: "PoppinsMedium",
    fontSize: dimensions.fontSizeSubTitle,
    color: colors.onTertiary,
  },
});
