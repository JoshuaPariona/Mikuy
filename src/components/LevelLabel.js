import { StyleSheet, Text, View } from "react-native";
import React from "react";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { dimensions } from "../utils/dimensions";
import { colors } from "../themes/colors";
import PropTypes from "prop-types";

const icon = {
  "fácil": "signal-cellular-1",
  "intermedio": "signal-cellular-2",
  "difícil": "signal-cellular-3"
}

const LevelLabel = (props) => {
  const { level } = props;

  return (
    <View style={{ alignItems: "center", flexDirection: "row", gap: 2 }}>
      <MaterialCommunityIcons
        name={icon[level] || "signal-cellular-1"}
        size={dimensions.smallIconSize}
        color={colors.primary}
      />
      <Text style={styles.level}>Nivel {level}</Text>
    </View>
  );
};

LevelLabel.propTypes = {
  level: PropTypes.any.isRequired,
};

const styles = StyleSheet.create({
  level: {
    fontSize: dimensions.fontSizeSmall,
    fontWeight: "medium",
    color: colors.primary,
  },
});

export default LevelLabel;