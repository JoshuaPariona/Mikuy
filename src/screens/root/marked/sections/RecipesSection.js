import { StyleSheet, Text, View } from "react-native";
import React from "react";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { dimensions } from "../../../../utils/dimensions";
import { colors } from "../../../../themes/colors";
import { useGetCurrentUserQuery } from "../../../../services/user";
import RecipeItemDetailed from "../../components/RecipeItemDetailed";
import NoRecipes from "../../components/NoRecipes";

const RecipesSection = () => {
  const { data: user, isLoading } = useGetCurrentUserQuery();

  if (isLoading) {
    return <View />;
  }

  return (
    <View style={styles.section}>
      <View style={styles.header}>
        <View style={styles.row}>
          <Text style={styles.title}>Recetas guardadas</Text>
          <MaterialCommunityIcons
            name="silverware-fork-knife"
            size={dimensions.iconSize}
            color={colors.onBackground}
          />
        </View>
      </View>
      <View style={{ gap: dimensions.layoutVerticalGap }}>
        {user.markedRecipes && user.markedRecipes.length > 0 ? (
          user.markedRecipes.map((id) => (
            <RecipeItemDetailed key={id} recipeId={id} />
          ))
        ) : (
          <View
            style={{
              height: 600,
              justifyContent: "center",
              alignItems: "center",
              gap: 40,
            }}
          >
            <NoRecipes
              title="Aún no tienes recetas guardadas"
              subTitle="¡Comienza a guardar tus recetas favoritas tocando el botón de guardar!"
            />
            <MaterialCommunityIcons
              name="bookmark-minus-outline"
              size={40}
              color={colors.primary}
            />
          </View>
        )}
      </View>
    </View>
  );
};

export default RecipesSection;

const styles = StyleSheet.create({
  section: {
    flex: 1,
    gap: dimensions.sectionVerticalGap,
  },
  title: {
    fontFamily: "PoppinsMedium",
    fontSize: dimensions.fontSizeTitle,
    color: colors.onBackground,
  },
  header: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  row: {
    flexDirection: "row",
    gap: dimensions.sectionHorizontalGap,
  },
});
