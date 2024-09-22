import { StyleSheet, View } from "react-native";
import React from "react";
import SignInModal from "../../../components/SignInModal";

const NoUser = () => {
  return (
    <View style={styles.layout}>
      <SignInModal
        title={
          "Hey Mikuycito, primero accede a tu cuenta o registra una nueva para continuar aqui."
        }
        dismissButton={false}
      />
    </View>
  );
};

export default NoUser;

const styles = StyleSheet.create({
  layout: { flex: 1, alignItems: "center", justifyContent: "center" },
});
