import {
  StyleSheet,
  Image,
  Animated,
  Easing,
  useWindowDimensions,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { colors } from "../../themes/colors";
import { images } from "../../utils/images";
import WelcomeCarousel from "./WelcomeCarousel";

const Welcome = () => {
  const animatedDiameter = useRef(new Animated.Value(0)).current;
  const animatedOpacity = useRef(new Animated.Value(1)).current;
  const { width, height } = useWindowDimensions();
  const hypotenuse = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2)) + 50;
  const [next, setNext] = useState(false);

  useEffect(() => {
    animate();
  }, []);

  const animate = () => {
    Animated.timing(animatedDiameter, {
      toValue: hypotenuse,
      delay: 800,
      duration: 500,
      useNativeDriver: false,
      easing: Easing.ease,
    }).start(() => {
      Animated.timing(animatedOpacity, {
        toValue: 0,
        delay: 600,
        duration: 250,
        useNativeDriver: false,
        easing: Easing.ease,
      }).start(() => {
        setNext(true);
      });
    });
  };

  const animatedCircle = {
    height: animatedDiameter,
    width: animatedDiameter,
    borderRadius: hypotenuse,
  };
  const animatedPage = {
    opacity: animatedOpacity,
  };

  return next ? (
    <WelcomeCarousel />
  ) : (
    <Animated.View style={[styles.welcome, animatedPage]}>
      <Image
        style={{ position: "absolute", height: 200, width: 200 }}
        source={images.appLogo}
      ></Image>
      <Animated.View style={[styles.circleContainer, animatedCircle]}>
        <Image
          style={{ height: 200, width: 200 }}
          source={images.appLogoAlt}
        ></Image>
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  welcome: {
    flex: 1,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  circleContainer: {
    height: 0,
    width: 0,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    backgroundColor: colors.secondary,
  },
});

export default Welcome;
