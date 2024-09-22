import { StyleSheet, ScrollView, View } from "react-native";
import React from "react";
import RecipesSection from "./sections/RecipesSection";
import { dimensions } from "../../../utils/dimensions";
import { useSelector } from "react-redux";
import NoUser from "../components/NoUser";

const MarkedRecipes = () => {
  const { authUser } = useSelector((state) => state.auth);

  return authUser ? (
    <ScrollView
      style={{ flex: 1 }}
      keyboardDismissMode="on-drag"
      overScrollMode="never"
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.layout}>
        <RecipesSection />
      </View>
    </ScrollView>
  ) : (
    <NoUser />
  );
};

export default MarkedRecipes;

const styles = StyleSheet.create({
  layout: {
    paddingVertical: dimensions.layoutVerticalPadding,
    paddingHorizontal: dimensions.layoutHorizontalPadding,
    gap: dimensions.layoutVerticalGap,
  },
});
