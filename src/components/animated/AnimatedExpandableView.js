import { Animated, Easing } from "react-native";

import PropTypes from "prop-types";
import { useRef, useEffect } from "react";

const AnimatedExpandableView = (props) => {
  const { visibility, style, children, duration, easing, minSize, maxSize } =
    props;

  const animatedMaxHeight = useRef(
    new Animated.Value(visibility ? 0 : 1)
  ).current;

  const animatedMaxWidth = useRef(
    new Animated.Value(visibility ? 0 : 1)
  ).current;

  const animatedOpacity = useRef(
    new Animated.Value(visibility ? 0 : 1)
  ).current;

  const expandibleStyle = {
    maxHeight: animatedMaxHeight.interpolate({
      inputRange: [0, 1],
      outputRange: [minSize[1] ?? 0, maxSize[1] ?? 4000],
      extrapolate: "clamp",
    }),
    maxWidth: animatedMaxHeight.interpolate({
      inputRange: [0, 1],
      outputRange: [minSize[0] ?? 0, maxSize[0] ?? 4000],
      extrapolate: "clamp",
    }),
    opacity: animatedOpacity
  };

  useEffect(() => {
    animation();
  }, [visibility]);

  const animation = () => {
    Animated.parallel(
      [
        Animated.timing(animatedMaxHeight, {
          toValue: visibility ? 1 : 0,
          duration: duration || 250,
          easing: easing || Easing.linear,
          useNativeDriver: false,
        }),
        Animated.timing(animatedMaxWidth, {
          toValue: visibility ? 1 : 0,
          duration: duration || 250,
          easing: easing || Easing.linear,
          useNativeDriver: false,
        }),
        Animated.timing(animatedOpacity, {
          toValue: visibility ? 1 : 0,
          duration: duration || 250,
          easing: easing || Easing.linear,
          useNativeDriver: false,
        })
      ]
    ).start();
  };

  return (
    <Animated.View style={[style, expandibleStyle]}>{children}</Animated.View>
  );
};

AnimatedExpandableView.propTypes = {
  children: PropTypes.node,
  duration: PropTypes.number,
  easing: PropTypes.func,
  style: PropTypes.object,
  minSize: PropTypes.array.isRequired,
  maxSize: PropTypes.array.isRequired,
  visibility: PropTypes.bool.isRequired,
};

export default AnimatedExpandableView;
