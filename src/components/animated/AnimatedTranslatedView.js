import { Animated, Easing } from "react-native";
import PropTypes from "prop-types";
import { useEffect, useRef } from "react";

const AnimatedTranslatedView = (props) => {
  const {
    toggle,
    style,
    delay,
    duration,
    children,
    easing,
    startPosition = [0, 0],
    endPosition = [0, 0],
    startOpacity = 1,
    endOpacity = 1 
  } = props;

  const animated = useRef(new Animated.Value(toggle? 1 : 0)).current;

  const animation = () => {
    Animated.timing(animated, {
      toValue: toggle? 1 : 0,
      delay: delay || 0,
      duration: duration || 250,
      easing: easing || Easing.ease,
      useNativeDriver: false,
    }).start();
  };

  useEffect(() => {
    animation();
  }, [toggle]);

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
    opacity: animated.interpolate({
      inputRange: [0, 1],
      outputRange: [startOpacity, endOpacity]
    })
  };

  return (
    <Animated.View style={[style, styleTranslate]}>{children}</Animated.View>
  );
};

AnimatedTranslatedView.propTypes = {
  toggle: PropTypes.bool.isRequired,
  style: PropTypes.object,
  delay: PropTypes.number,
  duration: PropTypes.number,
  children: PropTypes.node.isRequired,
  easing: PropTypes.func,
  startPosition: PropTypes.arrayOf(PropTypes.number),
  endPosition: PropTypes.arrayOf(PropTypes.number),
  startOpacity: PropTypes.number,
  endOpacity: PropTypes.number,
};

export default AnimatedTranslatedView;