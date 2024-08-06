import { View, StyleSheet } from "react-native";
import React from "react";
import { dimensions } from "../../utils/dimensions";
import CategoriesSection from "./sections/CategoriesSection";
import RecommendationSection from "./sections/RecommendationSection";
import PopularSection from "./sections/PopularSection";

const Home = () => {
  return (
    <View style={styles.layout}>
      <CategoriesSection />
      <RecommendationSection />
      <PopularSection />
    </View>
  );
};

const styles = StyleSheet.create({
  layout: {
    paddingVertical: dimensions.layoutVerticalPadding,
    paddingHorizontal: dimensions.layoutHorizontalPadding,
    gap: dimensions.layoutVerticalGap,
  },
});

export default Home;
