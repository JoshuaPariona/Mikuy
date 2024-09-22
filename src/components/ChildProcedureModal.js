import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import Octicons from "@expo/vector-icons/Octicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome from "@expo/vector-icons/FontAwesome";

import { dimensions } from "../utils/dimensions";
import { colors } from "../themes/colors";

const ChildProcedureModal = ({ onSelect }) => {
  return (
    <View style={styles.deleteModal}>
      <Text style={styles.title}>
        ¿Desea agregar algun paso, tip, alerta o comentario?
      </Text>
      <View style={styles.row}>
        <Pressable
          style={styles.buttonContainer}
          onPress={() => onSelect?.("step")}
        >
          <View style={styles.button}>
            <Octicons name="hash" size={25} color={colors.onPrimary} />
          </View>
          <Text style={styles.subTitle}>Paso</Text>
        </Pressable>
        <Pressable
          style={styles.buttonContainer}
          onPress={() => onSelect?.("tip")}
        >
          <View style={styles.button}>
            <MaterialIcons
              name="tips-and-updates"
              size={25}
              color={colors.onPrimary}
            />
          </View>
          <Text style={styles.subTitle}>Tip</Text>
        </Pressable>
      </View>
      <View style={styles.row}>
        <Pressable
          style={styles.buttonContainer}
          onPress={() => onSelect?.("warning")}
        >
          <View style={styles.button}>
            <FontAwesome name="warning" size={25} color={colors.onPrimary} />
          </View>
          <Text style={styles.subTitle}>Alerta</Text>
        </Pressable>
        <Pressable
          style={styles.buttonContainer}
          onPress={() => onSelect?.("c")}
        >
          <View style={styles.button}>
            <Octicons name="comment" size={25} color={colors.onPrimary} />
          </View>
          <Text style={[styles.subTitle]}>Comentario</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default ChildProcedureModal;

const styles = StyleSheet.create({
  deleteModal: {
    gap: dimensions.sectionHorizontalGap,
    paddingVertical: dimensions.layoutVerticalPadding,
    paddingHorizontal: dimensions.layoutHorizontalPadding,
    alignItems: "center",
  },
  row: {
    width: "100%",
    flexDirection: "row",
    gap: dimensions.sectionHorizontalGap,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 25,
  },
  title: {
    fontFamily: "PoppinsBold",
    fontSize: dimensions.fontSizeTitle,
    color: colors.primary,
    textAlign: "center",
  },
  subTitle: {
    fontFamily: "PoppinsMedium",
    fontSize: dimensions.fontSizeSubTitle,
    color: colors.onBackground,
    textAlign: "center",
    flex: 1,
  },
  button: {
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
    borderRadius: 25,
  },
});
