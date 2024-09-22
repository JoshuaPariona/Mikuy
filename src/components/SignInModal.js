import { TouchableOpacity, StyleSheet, Text, View } from "react-native";
import React from "react";
import { dimensions } from "../utils/dimensions";
import { colors } from "../themes/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import Octicons from "@expo/vector-icons/Octicons";
import { useNavigation } from "@react-navigation/native";

const SignInModal = ({
  title,
  dismissButton = true,
  onNavigation,
  onDismiss,
}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.signInModal}>
      <Text style={styles.title}>
        {title ||
          "Para realizar esta acción,\nnecesitas iniciar sesión en tu cuenta."}
      </Text>
      <View style={styles.row}>
        <TouchableOpacity
          activeOpacity={0.85}
          style={styles.button}
          onPress={() => {
            onNavigation?.();
            navigation.navigate("authentication");
          }}
        >
          <Ionicons
            name="key-outline"
            size={dimensions.iconSize}
            color={colors.onPrimary}
          />
          <Text style={styles.subTitle}>Iniciar sesión</Text>
        </TouchableOpacity>
        {dismissButton && (
          <TouchableOpacity
            activeOpacity={0.85}
            style={[styles.button, { backgroundColor: colors.background }]}
            onPress={() => onDismiss?.()}
          >
            <Octicons
              name="arrow-right"
              size={dimensions.iconSize}
              color={colors.onBackground}
            />
            <Text style={[styles.subTitle, { color: colors.onBackground }]}>
              Omitir
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default SignInModal;

const styles = StyleSheet.create({
  signInModal: {
    gap: dimensions.sectionHorizontalGap,
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
    fontFamily: "PoppinsMedium",
    fontSize: dimensions.fontSizeSubTitle,
    color: colors.onPrimary,
    textAlign: "center",
  },
  button: {
    flexDirection: "row",
    backgroundColor: colors.primary,
    gap: dimensions.sectionHorizontalGap,
    paddingVertical: dimensions.sectionVerticalPadding,
    paddingHorizontal: dimensions.sectionHorizontalPadding,
    borderRadius: dimensions.sectionBorderRadius,
    borderWidth: 2,
    borderColor: colors.primary,
  },
});
