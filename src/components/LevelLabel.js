import { StyleSheet, Text, View } from "react-native";
import React from "react";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { dimensions } from "../utils/dimensions";
import { colors } from "../themes/colors";
import PropTypes from "prop-types";

const icon = {
  fácil: "signal-cellular-1",
  intermedio: "signal-cellular-2",
  avanzado: "signal-cellular-3",
};

const LevelLabel = (props) => {
  const { level = "", color } = props;

  return (
    <View style={{ alignItems: "center", flexDirection: "row", gap: 5 }}>
      <MaterialCommunityIcons
        name={icon[level] || "signal-cellular-1"}
        size={dimensions.smallIconSize}
        color={color || colors.primary}
      />
      <Text style={[styles.level, { color: color || colors.primary }]}>
        Nvl. {level}
      </Text>
    </View>
  );
};

LevelLabel.propTypes = {
  level: PropTypes.string,
  color: PropTypes.any,
};

const styles = StyleSheet.create({
  level: {
    fontSize: dimensions.fontSizeSmall,
    fontFamily: "PoppinsMedium",
  },
});

export default LevelLabel;
