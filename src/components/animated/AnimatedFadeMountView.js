import { Animated, Easing } from "react-native";
import PropTypes from "prop-types";
import { useEffect, useRef } from "react";

const AnimatedFadeMountView = (props) => {
  const { style, delay, duration, children, easing } = props;

  const animated = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    animation();
  }, []);

  const animation = () => {
    Animated.timing(animated, {
      toValue: 1,
      delay: delay || 0,
      duration: duration || 250,
      easing: easing || Easing.ease,
      useNativeDriver: false,
    }).start();
  };

  const styleOpacity = {
    opacity: animated,
  };

  return (
    <Animated.View style={[style, styleOpacity]}>{children}</Animated.View>
  );
};

AnimatedFadeMountView.propTypes = {
  style: PropTypes.object,
  delay: PropTypes.number,
  duration: PropTypes.number,
  children: PropTypes.node,
  easing: PropTypes.func,
};

export default AnimatedFadeMountView;
