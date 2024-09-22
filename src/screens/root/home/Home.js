import { View, StyleSheet, Animated } from "react-native";
import React from "react";
import { dimensions } from "../../../utils/dimensions";
import CategoriesSection from "./sections/CategoriesSection";
import RecommendationSection from "./sections/RecommendationSection";
import PopularSection from "./sections/PopularSection";
import PropTypes from "prop-types";

const Home = ({ scrollOffsetY, tabNavigator }) => {
  return (
    <Animated.ScrollView
      style={{ flex: 1 }}
      keyboardDismissMode="on-drag"
      overScrollMode="never"
      showsVerticalScrollIndicator={false}
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollOffsetY } } }],
        { useNativeDriver: false }
      )}
      scrollEventThrottle={16}
    >
      <View style={styles.layout}>
        <CategoriesSection tabNavigator={tabNavigator} />
        <RecommendationSection />
        <PopularSection tabNavigator={tabNavigator} />
      </View>
    </Animated.ScrollView>
  );
};

Home.propTypes = {
  scrollOffsetY: PropTypes.any,
};

const styles = StyleSheet.create({
  layout: {
    paddingVertical: dimensions.layoutVerticalPadding,
    paddingHorizontal: dimensions.layoutHorizontalPadding,
    gap: dimensions.layoutVerticalGap,
  },
});

export default Home;
