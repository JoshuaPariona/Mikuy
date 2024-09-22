import { StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { dimensions } from "../utils/dimensions";
import { colors } from "../themes/colors";
import PropTypes from "prop-types";
import { useNavigation } from "@react-navigation/native";

const PopButton = ({ style, popOverwrittenFunc }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      style={[style, styles.popButton]}
      onPress={() => {
        if (popOverwrittenFunc) popOverwrittenFunc();
        else if (navigation.canGoBack()) navigation.goBack();
      }}
    >
      <Ionicons
        name="return-up-back"
        size={dimensions.iconSize}
        color={colors.onPrimary}
      />
    </TouchableOpacity>
  );
};

PopButton.propTypes = {
  style: PropTypes.object,
  popOverwrittenFunc: PropTypes.func,
};

const styles = StyleSheet.create({
  popButton: {
    paddingHorizontal: 8,
    paddingVertical: 5,
    backgroundColor: colors.primary,
    borderRadius: 8,
  },
});

export default PopButton;
