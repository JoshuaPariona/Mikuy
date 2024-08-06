import { Animated, View, Easing } from "react-native";
import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
/**
 * Toggle is boolean, if toggle is false first component will be displayed
 * ComponentBaseSize is string (first, second, undefined(first))
 * @param {*} props
 * @returns AnimatedRotateSwitchComponent
 */
const AnimatedFadeSwitchComponent = (props) => {
  const {
    toggle,
    firstComponent,
    secondComponent,
    componentBaseSize, //first, second, undefined(first)
    duration,
    easing,
  } = props;

  const animated = useRef(new Animated.Value(toggle ? 1 : 0)).current;

  //false: first component, true: second component
  const base = baseStyle();

  function baseStyle() {
    if (componentBaseSize) {
      return componentBaseSize === "second";
    }
    return false;
  }

  const animation = () => {
    Animated.timing(animated, {
      toValue: toggle ? 1 : 0,
      duration: duration || 250,
      easing: easing || Easing.linear,
      useNativeDriver: false,
    }).start();
  };

  useEffect(() => {
    animation();
  }, [toggle]);

  const styleSwitchFirst = {
    opacity: animated.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0],
    }),
  };

  const styleSwitchSecond = {
    opacity: animated,
  };

  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Animated.View
        style={[
          {
            position: base ? "absolute" : undefined,
            pointerEvents: toggle ? "none" : "auto",
          },
          styleSwitchFirst,
        ]}
      >
        {firstComponent}
      </Animated.View>
      <Animated.View
        style={[
          {
            position: base ? undefined : "absolute",
            pointerEvents: toggle ? "auto" : "none",
          },
          styleSwitchSecond,
        ]}
      >
        {secondComponent}
      </Animated.View>
    </View>
  );
};

AnimatedFadeSwitchComponent.propTypes = {
  toggle: PropTypes.bool.isRequired,
  firstComponent: PropTypes.node.isRequired,
  secondComponent: PropTypes.node.isRequired,
  componentBaseSize: PropTypes.string,
  duration: PropTypes.number,
  easing: PropTypes.func,
};

export default AnimatedFadeSwitchComponent;
