import { StyleSheet, View } from "react-native";
import React from "react";
import TimerLabel from "../../../components/TimerLabel";
import LevelLabel from "../../../components/LevelLabel";
import ServingLabel from "../../../components/ServingLabel";
import { colors } from "../../../themes/colors";

const MainDetailsSection = ({ recipe }) => {
  return (
    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
      <View style={styles.label}>
        <TimerLabel color={colors.onPrimary} time={recipe.duration || 0} />
      </View>
      <View style={styles.label}>
        <LevelLabel color={colors.onPrimary} level={recipe.difficulty || ""} />
      </View>
      <View style={styles.label}>
        <ServingLabel
          color={colors.onPrimary}
          servings={recipe.servings || ""}
        />
      </View>
    </View>
  );
};

export default MainDetailsSection;

const styles = StyleSheet.create({
  label: {
    backgroundColor: colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 10,
  },
});
