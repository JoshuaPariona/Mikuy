import { TouchableOpacity, StyleSheet, Text, View } from "react-native";
import React from "react";
import { dimensions } from "../utils/dimensions";
import { colors } from "../themes/colors";

const LogOutModal = ({ onConfirm, onDismiss }) => {
  return (
    <View style={styles.logOutModal}>
      <Text style={styles.title}>
        ¿Estás seguro de que deseas cerrar sesión?
      </Text>
      <View style={styles.row}>
        <TouchableOpacity
          activeOpacity={0.85}
          style={styles.button}
          onPress={() => onConfirm?.()}
        >
          <Text style={styles.subTitle}>Si, cerrar sesión</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.85}
          style={[styles.button, { backgroundColor: colors.background }]}
          onPress={() => onDismiss?.()}
        >
          <Text style={[styles.subTitle, { color: colors.onBackground }]}>
            Cancelar
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LogOutModal;

const styles = StyleSheet.create({
  logOutModal: {
    gap: dimensions.sectionVerticalGap,
    paddingVertical: dimensions.layoutVerticalPadding,
    paddingHorizontal: dimensions.layoutHorizontalPadding,
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    gap: dimensions.sectionHorizontalGap,
  },
  title: {
    fontFamily: "PoppinsBold",
    fontSize: dimensions.fontSizeTitle,
    color: colors.primary,
    textAlign: "center",
  },
  subTitle: {
    flex: 1,
    fontFamily: "PoppinsMedium",
    fontSize: dimensions.fontSizeSubTitle,
    color: colors.onPrimary,
    textAlign: "center",
  },
  button: {
    backgroundColor: colors.primary,
    gap: dimensions.sectionHorizontalGap,
    paddingVertical: dimensions.sectionVerticalPadding,
    paddingHorizontal: dimensions.sectionHorizontalPadding,
    borderRadius: dimensions.sectionBorderRadius,
    borderWidth: 2,
    borderColor: colors.primary,
  },
});
