import React, { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { dimensions } from "../utils/dimensions";
import Entypo from "@expo/vector-icons/Entypo";
import { colors } from "../themes/colors";
import PropTypes from "prop-types";
import AnimatedScaleView from "./animated/AnimatedScaleView";

const BackAndForwardButtons = (props) => {
  const [pressed, setPressed] = useState([false, false]);

  return (
    <View style={styles.container}>
      <Pressable onPress={props.onBack}
        onPressIn={() => setPressed([true, false])}
        onPressOut={() => setPressed([false, false])}
      >
        <AnimatedScaleView toggle={pressed[0]} scale={0.7}>
          <Entypo
            name="chevron-left"
            size={dimensions.iconSize}
            color={colors.primary}
          />
        </AnimatedScaleView>
      </Pressable>
      <Pressable onPress={props.onForward}
        onPressIn={() => setPressed([false, true])}
        onPressOut={() => setPressed([false, false])}
      >
        <AnimatedScaleView toggle={pressed[1]} scale={0.7}>
          <Entypo
            name="chevron-right"
            size={dimensions.iconSize}
            color={colors.primary}
          />
        </AnimatedScaleView>
      </Pressable>
    </View>
  );
};

BackAndForwardButtons.propTypes = {
  onBack: PropTypes.func.isRequired,
  onForward: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: dimensions.subSectionHorizontalGap,
  },
});

export default BackAndForwardButtons;
