import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { dimensions } from "../utils/dimensions";
import { colors } from "../themes/colors";
import AntDesign from "@expo/vector-icons/AntDesign";

const DeleteModal = ({ title, onConfirm, onDismiss }) => {
  return (
    <View style={styles.deleteModal}>
      <Text style={styles.title}>{title}</Text>
      <AntDesign name="delete" size={80} color={colors.primary} />
      <View style={styles.row}>
        <Pressable style={styles.button} onPress={() => onConfirm?.()}>
          <Text style={styles.subTitle}>Si, eliminar</Text>
        </Pressable>
        <Pressable
          style={[styles.button, { backgroundColor: colors.background }]}
          onPress={() => onDismiss?.()}
        >
          <Text style={[styles.subTitle, { color: colors.onBackground }]}>
            Cancelar
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default DeleteModal;

const styles = StyleSheet.create({
  deleteModal: {
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
