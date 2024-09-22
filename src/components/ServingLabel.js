import { StyleSheet, Text, View } from "react-native";
import React from "react";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { dimensions } from "../utils/dimensions";
import { colors } from "../themes/colors";
import PropTypes from "prop-types";

const ServingLabel = (props) => {
  const { servings, color } = props;
  return (
    <View style={{ alignItems: "center", flexDirection: "row", gap: 5 }}>
      <MaterialCommunityIcons
        name="room-service-outline"
        size={dimensions.smallIconSize}
        color={color || colors.primary}
      />
      <Text
        style={[
          styles.serving,
          {
            color: color || colors.primary,
          },
        ]}
      >
        {servings} porc.
      </Text>
    </View>
  );
};

ServingLabel.propTypes = {
  servings: PropTypes.any.isRequired,
};

export default ServingLabel;

const styles = StyleSheet.create({
  serving: {
    fontFamily: "PoppinsMedium",
    fontSize: dimensions.fontSizeSmall,
  },
});
