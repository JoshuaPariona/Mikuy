import { Animated, Easing } from "react-native";
import React, { useEffect, useRef } from "react";

import PropTypes from "prop-types";

const AnimatedSwingView = (props) => {
  const { state, children} = props;
  const animated = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    animateSequence();
  }, [state]);

  const animateSequence = () => {
    const swingSequence = Animated.sequence([
      Animated.timing(animated, {
        toValue: 1,
        duration: 80,
        easing: Easing.linear,
        useNativeDriver: false,
      }),
      Animated.timing(animated, {
        toValue: -1,
        duration: 80,
        easing: Easing.linear,
        useNativeDriver: false,
      }),
      Animated.timing(animated, {
        toValue: 1,
        duration: 80,
        easing: Easing.linear,
        useNativeDriver: false,
      }),
      Animated.timing(animated, {
        toValue: -1,
        duration: 80,
        easing: Easing.linear,
        useNativeDriver: false,
      }),
      Animated.timing(animated, {
        toValue: 0,
        duration: 80,
        easing: Easing.linear,
        useNativeDriver: false,
      }),
    ]);
    swingSequence.start();
  };

  const styleSwing = {
    transform: [
      {
        rotate: animated.interpolate({
          inputRange: [-1, 1],
          outputRange: ["-10deg", "10deg"],
        }),
      },
    ],
  };

  return <Animated.View style={styleSwing}>{children}</Animated.View>;
};

AnimatedSwingView.propTypes = {
  state: PropTypes.any.isRequired,
  children: PropTypes.node,
};

export default AnimatedSwingView;
