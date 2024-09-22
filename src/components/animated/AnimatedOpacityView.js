import { Animated, Easing } from "react-native";
import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";

const AnimatedOpacityView = ({ toggle, style, children }) => {
  const animatedOpacity = useRef(new Animated.Value(toggle ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(animatedOpacity, {
      toValue: toggle ? 1 : 0,
      duration: 250,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start();
  }, [toggle]);

  const opacityStyle = {
    opacity: animatedOpacity,
  };

  return (
    <Animated.View style={[style, opacityStyle]}>{children}</Animated.View>
  );
};

AnimatedOpacityView.propTypes = {
  toggle: PropTypes.bool.isRequired,
  children: PropTypes.node,
  style: PropTypes.object,
};

export default AnimatedOpacityView;
