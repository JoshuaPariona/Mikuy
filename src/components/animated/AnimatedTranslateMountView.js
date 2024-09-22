import { Animated, Easing } from "react-native";
import PropTypes from "prop-types";
import { useEffect, useRef } from "react";

const AnimatedTranslateMountView = (props) => {
  const {
    style,
    delay,
    duration,
    children,
    easing,
    startPosition = [0, 0],
    endPosition = [0, 0],
  } = props;

  const animated = useRef(new Animated.Value(0)).current;

  const animation = () => {
    Animated.timing(animated, {
      toValue: 1,
      delay: delay || 0,
      duration: duration || 250,
      easing: easing || Easing.ease,
      useNativeDriver: false,
    }).start();
  };

  useEffect(() => {
    animation();
  }, []);

  const styleTranslate = {
    transform: [
      {
        translateX: animated.interpolate({
          inputRange: [0, 1],
          outputRange: [startPosition[0], endPosition[0]],
        }),
      },
      {
        translateY: animated.interpolate({
          inputRange: [0, 1],
          outputRange: [startPosition[1], endPosition[1]],
        }),
      },
    ],
  };

  return (
    <Animated.View style={[style, styleTranslate]}>{children}</Animated.View>
  );
};

AnimatedTranslateMountView.propTypes = {
  style: PropTypes.object,
  delay: PropTypes.number,
  duration: PropTypes.number,
  children: PropTypes.node.isRequired,
  easing: PropTypes.func,
  startPosition: PropTypes.arrayOf(PropTypes.number),
  endPosition: PropTypes.arrayOf(PropTypes.number),
};

export default AnimatedTranslateMountView;
