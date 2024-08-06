import { Animated, Easing } from "react-native";
import React, { useEffect, useRef } from "react";

import PropTypes from "prop-types";

/**
 * Toggle is boolean, if is false base scale is displayed otherwise established scale will be displayed
 * @param {*} props
 * @returns AnimatedScaleView
 */
const AnimatedScaleView = (props) => {
  const { children, style, duration, easing, scale, toggle } = props;

  const animatedScale = useRef(new Animated.Value(toggle ? 1 : 0)).current;

  const animation = () => {
    Animated.timing(animatedScale, {
      toValue: toggle ? 1 : 0,
      duration: duration || 250,
      easing: easing || Easing.linear,
      useNativeDriver: false,
    }).start();
  };

  useEffect(() => {
    animation();
  }, [toggle]);

  const scaleStyle = {
    transform: [
      {
        scale: animatedScale.interpolate({
          inputRange: [0, 1],
          outputRange: [1, scale],
        }),
      },
    ],
  };

  return <Animated.View style={[style, scaleStyle]}>{children}</Animated.View>;
};

AnimatedScaleView.propTypes = {
  children: PropTypes.node,
  style: PropTypes.object,
  duration: PropTypes.number,
  easing: PropTypes.func,
  toggle: PropTypes.bool.isRequired,
  scale: PropTypes.number.isRequired,
};

export default AnimatedScaleView;
