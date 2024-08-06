import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { dimensions } from "../../../utils/dimensions";
import { colors } from "../../../themes/colors";

const categories = require("../../../data/principal_categories.json");

import PropTypes from "prop-types";
import Paths from "../../../utils/paths";
import AnimatedBackGroundColorView from "../../../components/animated/AnimatedBackGroundColorView";

const CategoriesSection = () => {
  return (
    <View style={styles.section}>
      <Text style={styles.title}>Categorías</Text>
      <CategoriesCarousel />
    </View>
  );
};

const CategoryItem = (props) => {
  const item = props.item;
  const [pressed, setPressed] = useState(false);

  return (
    <View style={styles.categoryCard}>
      <Pressable
        style={styles.categoryButton}
        onPress={() => {
          console.log(item.id); //TODO: navigation
        }}
        onPressIn={() => setPressed(true)}
        onPressOut={() => setPressed(false)}
      >
        <AnimatedBackGroundColorView
          toggle={pressed}
          style={styles.categoryButton}
          startColor={colors.primary}
          endColor={colors.primaryWithOpacity}
          duration={100}
        >
          <Image
            style={styles.categoryIcon}
            source={Paths.requireIconCategory[item.id]}
          />
        </AnimatedBackGroundColorView>
      </Pressable>
      <Text style={styles.subTitle}>{item.name}</Text>
    </View>
  );
};

CategoryItem.propTypes = {
  item: PropTypes.object.isRequired,
};

const CategoriesCarousel = () => {
  return (
    <FlatList
      key={"categories"}
      keyExtractor={(item) => item.id}
      data={categories}
      renderItem={({ item }) => <CategoryItem item={item} />}
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
    fontSize: dimensions.fontSizeTitle,
    fontWeight: "medium",
    color: colors.onBackground,
  },
  subTitle: {
    fontSize: dimensions.fontSizeSubTitle,
    fontWeight: "medium",
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
    justifyContent: "center",
    alignItems: "center",
  },
  categoryIcon: {
    height: 40,
    width: 40,
  },
});

export default CategoriesSection;
