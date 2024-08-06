import { Animated, Easing } from "react-native";

import PropTypes from "prop-types";
import { useRef, useEffect } from "react";

/**
 * Visibility is boolean, if visibility is true the children will be displayed
 * @param {*} props 
 * @returns AnimatedExpandableView
 */
const AnimatedExpandableView = (props) => {
  const { visibility, style, children, duration, easing, minSize, maxSize } =
    props;

  const animated = useRef(new Animated.Value(visibility ? 1 : 0)).current;

  useEffect(() => {
    animation();
  }, [visibility]);

  const animation = () => {
    Animated.timing(animated, {
      toValue: visibility ? 1 : 0,
      duration: duration || 250,
      easing: easing || Easing.linear,
      useNativeDriver: false,
    }).start();
  };

  const expandibleStyle = {
    maxHeight: animated.interpolate({
      inputRange: [0, 1],
      outputRange: [minSize[1] ?? 0, maxSize[1] ?? 4000],
      extrapolate: "clamp",
    }),
    maxWidth: animated.interpolate({
      inputRange: [0, 1],
      outputRange: [minSize[0] ?? 0, maxSize[0] ?? 4000],
      extrapolate: "clamp",
    }),
    opacity: animated,
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
