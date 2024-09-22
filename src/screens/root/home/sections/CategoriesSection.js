import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useContext } from "react";
import { dimensions } from "../../../../utils/dimensions";
import { colors } from "../../../../themes/colors";

import PropTypes from "prop-types";
import { useGetRecipeCategoriesQuery } from "../../../../services/recipe";
import AnimatedShimmerLoading from "../../../../components/animated/AnimatedShimerLoading";
import { SearchInputContext } from "../../../../context/SearchInputProvider";

const CategoriesSection = ({ tabNavigator }) => {
  return (
    <View style={styles.section}>
      <Text style={styles.title}>Categorías</Text>
      <CategoriesCarousel tabNavigator={tabNavigator} />
    </View>
  );
};

const CategoryItem = ({ item, tabNavigator }) => {
  const { setCategory} = useContext(SearchInputContext)
  return (
    <View style={styles.categoryCard}>
      <TouchableOpacity
        activeOpacity={0.85}
        style={styles.categoryButton}
        onPress={() => {
          tabNavigator.slideTo("cookbook");
          setCategory(item.id)
        }}
      >
        <Image
          style={styles.categoryIcon}
          source={{
            uri: item.image,
          }}
        />
      </TouchableOpacity>

      <Text style={styles.subTitle}>{item.name}</Text>
    </View>
  );
};

CategoryItem.propTypes = {
  item: PropTypes.object.isRequired,
};

const CategoriesCarousel = ({ tabNavigator }) => {
  const { data: categories, isLoading } = useGetRecipeCategoriesQuery();

  if (isLoading) {
    return (
      <FlatList
        data={Array.from({ length: 5 })}
        keyExtractor={(_, index) => `shimmer-${index}`}
        renderItem={() => (
          <View style={styles.categoryCard}>
            <AnimatedShimmerLoading style={styles.categoryIcon} />
            <AnimatedShimmerLoading
              style={{ height: 22, width: "100%", borderRadius: 10 }}
            />
          </View>
        )}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        overScrollMode="never"
        ItemSeparatorComponent={
          <View style={{ width: dimensions.layoutHorizontalGap }} />
        }
      />
    );
  }

  return (
    <FlatList
      key={"categories"}
      keyExtractor={(item) => item.id}
      data={categories}
      renderItem={({ item }) => (
        <CategoryItem key={item.id} item={item} tabNavigator={tabNavigator} />
      )}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      overScrollMode="never"
      ItemSeparatorComponent={
        <View style={{ width: dimensions.layoutHorizontalGap }}></View>
      }
    />
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
  subTitle: {
    fontFamily: "PoppinsRegular",
    fontSize: dimensions.fontSizeSubTitle,
    color: colors.onBackground,
  },
  categoryCard: {
    alignItems: "center",
    gap: dimensions.subSectionVerticalGap,
  },
  categoryButton: {
    height: 70,
    width: 70,
    borderRadius: 70,
  },
  categoryIcon: {
    height: 70,
    width: 70,
    borderRadius: 70,
    backgroundColor: colors.primary,
  },
});

export default CategoriesSection;
