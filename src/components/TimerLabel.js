import { StyleSheet, Text, View } from "react-native";
import React from "react";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { dimensions } from "../utils/dimensions";
import { colors } from "../themes/colors";
import PropTypes from "prop-types";

const TimerLabel = (props) => {
  const { time } = props;
  return (
    <View style={{ alignItems: "center", flexDirection: "row", gap: 2 }}>
      <MaterialCommunityIcons
        name="timer-outline"
        size={dimensions.smallIconSize}
        color={colors.primary}
      />
      <Text style={styles.time}>{time} min.</Text>
    </View>
  );
};

TimerLabel.propTypes = {
  time: PropTypes.any.isRequired,
};

export default TimerLabel;

const styles = StyleSheet.create({
  time: {
    fontSize: dimensions.fontSizeSmall,
    fontWeight: "medium",
    color: colors.primary,
  },
});
