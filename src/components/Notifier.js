import { StyleSheet, Animated, Easing } from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { dimensions } from "../utils/dimensions";
import NotifierController from "../controllers/NotifierController";

const Notifier = () => {
  const [visibility, setVisibility] = useState(false);
  const [message, setMessage] = useState(<></>);

  const offsetY = useRef(new Animated.Value(visibility ? 1 : 0)).current;

  const bindMethod = useCallback((name, value) => {
    console.log(`Bound: ${name} -> ${value}`);
    NotifierController.setControllerState(name, value);
  }, []);

  useEffect(() => {
    bindMethod("setNotifierVisibility", setVisibility);
    bindMethod("setNotifierMessage", setMessage);
  }, [bindMethod]);

  const styleNotifier = {
    bottom: offsetY.interpolate({
      inputRange: [0, 1],
      outputRange: [
        -(
          (
            dimensions.bottomNavBarHeight +
            dimensions.layoutVerticalPadding +
            30
          ) // content
        ),
        0,
      ],
      extrapolate: "clamp",
    }),
  };

  useEffect(() => {
    animation();
  }, [visibility]);

  const animation = () => {
    Animated.timing(offsetY, {
      toValue: visibility ? 1 : 0,
      duration: 250,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start();
  };

  return (
    <Animated.View style={[styles.notifier, styleNotifier]}>
      {message}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  notifier: {
    zIndex: 1,
    width: "100%",
    position: "absolute",
    backgroundColor: "rgba(41, 41, 41, 0.65)",
    paddingTop: dimensions.layoutVerticalPadding,
    paddingHorizontal: dimensions.layoutHorizontalPadding,
    paddingBottom:
      dimensions.bottomNavBarHeight + dimensions.layoutVerticalPadding,
    borderTopRightRadius: dimensions.layoutBorderRadius,
    borderTopLeftRadius: dimensions.layoutBorderRadius,
  },
});

export default Notifier;
