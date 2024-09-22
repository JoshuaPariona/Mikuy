import { Animated, Easing, StyleSheet } from "react-native";
import React, { useContext, useEffect, useRef } from "react";
import { NotifierContext } from "../../../context/NotifierProvider";
import { dimensions } from "../../../utils/dimensions";

const Notifier = () => {
  const { notifierVisibility, notifierMessage } = useContext(NotifierContext);
  const notifierOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(notifierOpacity, {
      toValue: notifierVisibility ? 1 : 0,
      duration: 250,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start();
  }, [notifierVisibility]);

  const notifierStyle = {
    opacity: notifierOpacity,
  };

  return (
    <Animated.View style={[styles.notifier, notifierStyle]}>
      {notifierMessage}
    </Animated.View>
  );
};

export default Notifier;

const styles = StyleSheet.create({
  notifier: {
    width: "100%",
    bottom: 0,
    position: "absolute",
    pointerEvents: "none",
    backgroundColor: "rgba(41, 41, 41, 0.65)",
    paddingHorizontal: dimensions.layoutHorizontalPadding,
    paddingVertical: dimensions.layoutVerticalPadding,
    borderTopRightRadius: dimensions.layoutBorderRadius,
    borderTopLeftRadius: dimensions.layoutBorderRadius,
  },
});
