import { StyleSheet, View, Image, Text } from "react-native";
import React from "react";
import { dimensions } from "../utils/dimensions";
import { colors } from "../themes/colors";

const SuccessModal = ({ title }) => {
  return (
    <View style={styles.successModal}>
      <View style={styles.modal}>
        <Text style={styles.title}>{title}</Text>
        <Image
          style={{
            height: 80,
            width: 80,
          }}
          source={require("../../assets/images/check.png")}
        />
      </View>
    </View>
  );
};

export default SuccessModal;

const styles = StyleSheet.create({
  successModal: {
    flex: 1,
    backgroundColor: "rgba(41, 41, 41, 0.65)",
    alignItems: "center",
    justifyContent: "center",
  },
  modal: {
    gap: dimensions.sectionVerticalGap,
    paddingVertical: dimensions.layoutVerticalPadding,
    paddingHorizontal: dimensions.layoutHorizontalPadding,
    alignItems: "center",
    backgroundColor: colors.background,
    borderRadius: dimensions.sectionBorderRadius,
  },
  title: {
    fontFamily: "PoppinsBold",
    fontSize: dimensions.fontSizeTitle,
    color: colors.primary,
    textAlign: "center",
  },
});
