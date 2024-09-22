import { StyleSheet, Text, View, Pressable } from "react-native";
import React, { useContext } from "react";
import { dimensions } from "../../../../utils/dimensions";
import { colors } from "../../../../themes/colors";
import { SearchInputContext } from "../../../../context/SearchInputProvider";
import { useGetRecipesPopularIdsQuery } from "../../../../services/recipe";
import RecipeItemDetailed from "../../components/RecipeItemDetailed";

const PopularSection = ({ tabNavigator }) => {
  const { setAverageRating } = useContext(SearchInputContext);
  const { data: popularIds, isLoading } = useGetRecipesPopularIdsQuery();

  if (isLoading) {
    return null;
  }

  return (
    <View style={styles.section}>
      <View style={styles.header}>
        <Text style={styles.title}>Recetas populares</Text>
        <Pressable
          hitSlop={5}
          onPress={() => {
            setAverageRating(4.5);
            tabNavigator.slideTo("cookbook");
          }}
        >
          <Text style={styles.moreButton}>Ver más</Text>
        </Pressable>
      </View>
      <View style={{ gap: dimensions.layoutVerticalGap }}>
        {popularIds?.map((id) => (
          <RecipeItemDetailed key={id} recipeId={id} />
        ))}
      </View>
    </View>
  );
};

const PopularWrapper = () => {};

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
  moreButton: {
    fontFamily: "PoppinsRegular",
    fontSize: dimensions.fontSizeSmall,
    color: colors.onTertiary,
  },
});

export default PopularSection;
