import { Animated } from "react-native";
import React from "react";

import PropTypes from "prop-types";

const AnimatedExpandableStepView = (props) => {
  const { step, minSize, maxSize, children } = props;

  const d = Math.sqrt(
    (maxSize[0] - minSize[0]) ** 2 + (maxSize[1] - minSize[1]) ** 2
  );

  const styleExpandableStep = {
    opacity: step.interpolate({
      inputRange: [0, d],
      outputRange: [1, 0],
      extrapolate: "clamp",
    }),
    maxHeight: step.interpolate({
      inputRange: [0, (maxSize[1] ?? 4000) - (minSize[1] ?? 0)],
      outputRange: [maxSize[1] ?? 4000, minSize[1] ?? 0],
      extrapolate: "clamp",
    }),
    maxWidth: step.interpolate({
      inputRange: [0, (maxSize[0] ?? 4000) - (minSize[0] ?? 0)],
      outputRange: [maxSize[0] ?? 4000, minSize[0] ?? 0],
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
};

export default AnimatedExpandableStepView;
