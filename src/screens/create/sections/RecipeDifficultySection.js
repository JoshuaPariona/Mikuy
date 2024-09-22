import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { colors } from "../../../themes/colors";
import { dimensions } from "../../../utils/dimensions";

const RecipeDifficultySection = ({ difficulty, setDifficulty }) => {
  return (
    <View style={styles.section}>
      <View style={styles.row}>
        <Text style={styles.subTitle}>Nivel de dificultad:</Text>
        {difficulty === "" && <Text style={styles.obligatory}>*</Text>}
      </View>
      <RadioButtons
        current={difficulty}
        onSelect={(difficulty) => setDifficulty(difficulty)}
      />
    </View>
  );
};

const RadioButtons = ({ current = "", onSelect }) => {
  return (
    <View
      style={{ flexDirection: "row", flex: 1, justifyContent: "space-between" }}
    >
      <Pressable style={styles.row} onPress={() => onSelect("fácil")}>
        <View
          style={[
            styles.radio,
            {
              backgroundColor:
                current === "fácil" ? colors.primary : "transparent",
            },
          ]}
        />
        <Text style={styles.label}>Fácil</Text>
      </Pressable>
      <Pressable style={styles.row} onPress={() => onSelect("intermedio")}>
        <View
          style={[
            styles.radio,
            {
              backgroundColor:
                current === "intermedio" ? colors.primary : "transparent",
            },
          ]}
        />
        <Text style={styles.label}>Intermedio</Text>
      </Pressable>
      <Pressable style={styles.row} onPress={() => onSelect("avanzado")}>
        <View
          style={[
            styles.radio,
            {
              backgroundColor:
                current === "avanzado" ? colors.primary : "transparent",
            },
          ]}
        />
        <Text style={styles.label}>Avanzado</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    gap: dimensions.sectionVerticalGap,
  },
  row: {
    gap: dimensions.sectionHorizontalGap,
    flexDirection: "row",
    alignItems: "center",
  },
  subTitle: {
    fontFamily: "PoppinsMedium",
    fontSize: dimensions.fontSizeSubTitle,
    color: colors.onBackground,
  },
  obligatory: {
    color: colors.error,
  },
  radio: {
    height: 15,
    width: 15,
    borderColor: colors.onTertiary,
    borderWidth: 1,
    borderRadius: 8,
  },
  label: {
    fontFamily: "PoppinsRegular",
    fontSize: dimensions.fontSizeSubTitle,
    color: colors.onBackground,
  },
});

export default RecipeDifficultySection;
