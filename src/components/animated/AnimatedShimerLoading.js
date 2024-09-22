import React, { useRef, useEffect } from "react";
import { Animated, Easing } from "react-native";
import { colors } from "../../themes/colors";

const AnimatedShimmerLoading = ({ style }) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 800,
          easing: Easing.ease,
          useNativeDriver: false,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 800,
          easing: Easing.ease,
          useNativeDriver: false,
        }),
      ])
    ).start();
  }, [animatedValue]);

  const color = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [colors.surface, colors.onTertiaryWithOpacity], // Adjust based on the width of your shimmer container
  });

  return <Animated.View style={[style, { backgroundColor: color }]} />;
};

export default AnimatedShimmerLoading;
