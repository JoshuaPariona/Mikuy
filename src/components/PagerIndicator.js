import { View, StyleSheet, Animated, Easing } from "react-native";
import React, { useEffect, useRef } from "react";
import { colors } from "../themes/colors";
import PropTypes from "prop-types";

const PagerIndicator = ({ style, page, indicatorsLength = 3 }) => {
  const indicators = Array.from(
    { length: indicatorsLength },
    (_, index) => index
  );
  
  const animatedValues = useRef(
    indicators.map((i) => new Animated.Value(page === i ? 30 : 10))
  ).current;

  useEffect(() => {
    animateIndicators();
  }, [page]);

  const animateIndicators = () => {
    const animations = indicators.map((i) =>
      Animated.timing(animatedValues[i], {
        toValue: page === i ? 30 : 10,
        duration: 250,
        easing: Easing.ease,
        useNativeDriver: false,
      })
    );

    Animated.parallel(animations).start();
  };

  return (
    <View style={[styles.pagerIndicator, style]}>
      {indicators.map((i) => (
        <Animated.View
          key={i}
          style={[styles.dot, { width: animatedValues[i] }]}
        />
      ))}
    </View>
  );
};

PagerIndicator.propTypes = {
  style: PropTypes.object,
  page: PropTypes.number.isRequired,
  indicatorsLength: PropTypes.number,
};

const styles = StyleSheet.create({
  pagerIndicator: {
    height: 30,
    width: 80,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  dot: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: colors.primary,
  },
  dotExpand: {
    height: 10,
    width: 30,
    borderRadius: 5,
    backgroundColor: colors.primary,
  },
});

export default PagerIndicator;
