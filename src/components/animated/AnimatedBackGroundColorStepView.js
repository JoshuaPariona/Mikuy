import { Animated } from "react-native";
import React from "react";

import PropTypes from "prop-types";

const AnimatedBackGroundColorStepView = (props) => {
  const { style, step, range, children, startColor="#fff", endColor="#000"} = props;

  const styleBackgroundStep = {
    backgroundColor: step.interpolate({
      inputRange: [0, range],
      outputRange: [startColor, endColor],
      extrapolate: "clamp",
    }),
  };

  return (
    <Animated.View style={[style, styleBackgroundStep]}>
      {children}
    </Animated.View>
  );
};

AnimatedBackGroundColorStepView.propTypes = {
  style: PropTypes.any,
  children: PropTypes.node,
  step: PropTypes.any.isRequired,
  range: PropTypes.number.isRequired,
  startColor: PropTypes.string,
  endColor: PropTypes.string,
};

export default AnimatedBackGroundColorStepView;
