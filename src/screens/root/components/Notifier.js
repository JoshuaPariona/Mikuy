import { StyleSheet, Animated, Easing } from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import { dimensions } from "../../../utils/dimensions";
import { NotifierContext } from "../../../context/NotifierProvider";

const Notifier = () => {
  const [notifierHeight, setNotifierHeight] = useState(0);
  const [savedNotifierMessage, setSavedNotifierMessage] = useState();
  const { notifierVisibility, notifierMessage } = useContext(NotifierContext);

  const offsetY = useRef(
    new Animated.Value(notifierVisibility ? 1 : 0)
  ).current;
  const textOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(offsetY, {
      toValue: notifierVisibility ? 1 : 0,
      duration: 250,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start();
  }, [notifierVisibility]);

  useEffect(() => {
    Animated.timing(textOpacity, {
      toValue: 1,
      duration: 250,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start(() => {
      setSavedNotifierMessage(notifierMessage);
      Animated.timing(textOpacity, {
        toValue: 0,
        duration: 500,
        easing: Easing.ease,
        useNativeDriver: false,
      }).start();
    });
  }, [notifierMessage]);

  const styleNotifier = {
    bottom: offsetY.interpolate({
      inputRange: [0, 1],
      outputRange: [
        -(
          (
            dimensions.bottomNavBarHeight +
            dimensions.layoutVerticalPadding +
            notifierHeight
          ) // content
        ),
        0,
      ],
      extrapolate: "clamp",
    }),
  };

  const styleMsm = {
    opacity: textOpacity.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0],
      extrapolate: "clamp",
    }),
  };

  const onNotifierLayout = (event) => {
    setNotifierHeight(event.nativeEvent.layout.height);
  };

  return (
    <Animated.View style={[styles.notifier, styleNotifier]}>
      <Animated.View style={styleMsm} onLayout={onNotifierLayout}>
        {savedNotifierMessage}
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  notifier: {
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
