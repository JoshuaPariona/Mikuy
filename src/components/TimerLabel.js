import { StyleSheet, Text, View } from "react-native";
import React from "react";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { dimensions } from "../utils/dimensions";
import { colors } from "../themes/colors";
import PropTypes from "prop-types";

const TimerLabel = (props) => {
  const { time, color} = props;
  return (
    <View style={{ alignItems: "center", flexDirection: "row", gap: 5 }}>
      <MaterialCommunityIcons
        name="timer-outline"
        size={dimensions.smallIconSize}
        color={color || colors.primary}
      />
      <Text
        style={[
          styles.time,
          {
            
            color: color || colors.primary,
          },
        ]}
      >
        {time} min.
      </Text>
    </View>
  );
};

TimerLabel.propTypes = {
  time: PropTypes.number.isRequired,
};

export default TimerLabel;

const styles = StyleSheet.create({
  time: {
    fontFamily: "PoppinsMedium",
    fontSize: dimensions.fontSizeSmall,
  },
});
