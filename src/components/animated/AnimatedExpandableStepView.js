import { Animated } from "react-native";
import React from "react";

import PropTypes from "prop-types";

const AnimatedExpandableStepView = (props) => {
  const { step, minSize, maxSize, range, withOpacity=true, children } = props;

  const styleExpandableStep = {
    opacity: withOpacity? step.interpolate({
      inputRange: [0, range],
      outputRange: [1, 0],
      extrapolate: "clamp",
    }) : 1,
    maxHeight: step.interpolate({
      inputRange: [0, range],
      outputRange: [maxSize[1] ?? 4000, minSize[1] ?? 4000],
      extrapolate: "clamp",
    }),
    maxWidth: step.interpolate({
      inputRange: [0, range],
      outputRange: [maxSize[0] ?? 4000, minSize[0] ?? 4000],
      extrapolate: "clamp",
    }),
  };

  return <Animated.View style={styleExpandableStep}>{children}</Animated.View>;
};

AnimatedExpandableStepView.propTypes = {
  children: PropTypes.node,
  step: PropTypes.any.isRequired,
  minSize: PropTypes.array.isRequired,
  maxSize: PropTypes.array.isRequired,
  range: PropTypes.number.isRequired,
  withOpacity: PropTypes.bool,
};

export default AnimatedExpandableStepView;
