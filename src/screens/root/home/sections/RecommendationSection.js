import { View, Text, StyleSheet, FlatList } from "react-native";
import React, { useRef, useState } from "react";
import { dimensions } from "../../../../utils/dimensions";
import { colors } from "../../../../themes/colors";

import BackAndForwardButtons from "../../../../components/BackAndForwardButtons";
import RecipeItemCompact from "../../components/RecipeItemCompact";
import { useGetRecipesRecommendedIdsQuery } from "../../../../services/recipe";

const RecommendationSection = () => {
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { data: recipeIds, isLoading } = useGetRecipesRecommendedIdsQuery();

  if (isLoading) {
    return null;
  }

  const maxIndex = recipeIds ? recipeIds.length - 1 : 0;

  const handleScroll = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const newIndex = Math.floor(
      (offsetX + 10) / (dimensions.sectionHorizontalGap + dimensions.dishCard1W)
    );
    setCurrentIndex(newIndex);
  };

  return (
    <View style={styles.section}>
      <View style={styles.header}>
        <Text style={styles.title}>Recomendado para ti</Text>
        <BackAndForwardButtons
          onBack={() => {
            if (currentIndex <= 0) return;
            flatListRef.current.scrollToIndex({ index: currentIndex - 1 });
          }}
          onForward={() => {
            if (currentIndex >= maxIndex) return;
            flatListRef.current.scrollToIndex({ index: currentIndex + 1 });
          }}
        />
      </View>
      <FlatList
        ref={flatListRef}
        key={"recommendations"}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        overScrollMode="never"
        data={recipeIds}
        renderItem={({ item }) => <RecipeItemCompact recipeId={item} />}
        ItemSeparatorComponent={
          <View style={{ width: dimensions.sectionHorizontalGap }} />
        }
        onScroll={handleScroll}
        scrollEventThrottle={16}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    gap: dimensions.sectionVerticalGap,
  },
  title: {
    fontFamily: "PoppinsMedium",
    fontSize: dimensions.fontSizeTitle,
    color: colors.onBackground,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default RecommendationSection;
