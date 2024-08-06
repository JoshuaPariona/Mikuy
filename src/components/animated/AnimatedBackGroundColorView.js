import { Animated, Easing } from "react-native";
import React, { useRef, useEffect } from "react";

import PropTypes from "prop-types";

/**
 * Toggle is boolean, if false start color is displayed else end color is displayed
 * @param {*} props
 * @returns AnimatedBackGroundColorView
 */
const AnimatedBackGroundColorView = (props) => {
  const { toggle, startColor, endColor, style, children, duration, easing } =
    props;

  const animatedColor = useRef(new Animated.Value(toggle ? 1 : 0)).current;

  const colorStyle = {
    backgroundColor: animatedColor.interpolate({
      inputRange: [0, 1],
      outputRange: [startColor, endColor]
    }),
  };

  useEffect(() => {
    animation();
  }, [toggle]);

  const animation = () => {
    Animated.timing(animatedColor, {
      toValue: toggle ? 1 : 0,
      duration: duration || 250,
      easing: easing || Easing.linear,
      useNativeDriver: false,
    }).start();
  };

  return (
    <Animated.View style={[colorStyle, style]}>
      {children}
    </Animated.View>
  );
};

AnimatedBackGroundColorView.propTypes = {
  toggle: PropTypes.bool.isRequired,
  startColor: PropTypes.string.isRequired,
  endColor: PropTypes.string.isRequired,
  children: PropTypes.node,
  style: PropTypes.object,
  duration: PropTypes.number,
  easing: PropTypes.func,
};

export default AnimatedBackGroundColorView;
