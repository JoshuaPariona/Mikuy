import { View, Text, StyleSheet, Image, FlatList } from "react-native";
import React from "react";
import { dimensions } from "../../../utils/dimensions";
import { colors } from "../../../themes/colors";

import PropTypes from "prop-types";
import BackAndForwardButtons from "../../../components/BackAndForwardButtons";
import BookMarkButton from "../../../components/BookMarkButton";
import TimerLabel from "../../../components/TimerLabel";

const dishes = require("../../../data/dishes.json");
const users = require("../../../data/users.json");

//TODO: Scroll Navigation
const RecommendationSection = () => {
  return (
    <View style={styles.section}>
      <View style={styles.header}>
        <Text style={styles.title}>Recomendado para ti</Text>
        <BackAndForwardButtons onBack={() => {}} onForward={() => {}} />
      </View>
      <RecommendationCarousel />
    </View>
  );
};

const RecommendationItem = (props) => {
  const { item } = props;
  const user = users.find((user) => user.id === item.by_id); //FIXME: User not found

  return (
    <View style={styles.dishCard}>
      <View style={styles.dishCardImageContainer}>
        <Image
          style={styles.dishCardImage}
          source={{
            uri: item.image,
          }}
        ></Image>
        <BookMarkButton
          initialState={false}
          item={item}
          style={styles.bookMarkButton}
        />
      </View>
      <Text style={styles.subTitle}>{item.name}</Text>
      <View
        style={{
          flexDirection: "row",
          gap: dimensions.subSectionHorizontalGap,
        }}
      >
        <Image
          style={styles.userAvatar}
          source={{
            uri: user.image,
          }}
        ></Image>
        <View style={{ justifyContent: "space-between", flex: 1 }}>
          <Text style={styles.dishCardUserName}>De {user.name}</Text>
          <TimerLabel time={item.duration} />
        </View>
      </View>
    </View>
  );
};

RecommendationItem.propTypes = {
  item: PropTypes.object.isRequired,
};

const RecommendationCarousel = () => {
  return (
    <FlatList
      key={"recommendations"}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      overScrollMode="never"
      data={dishes}
      renderItem={({ item }) => <RecommendationItem item={item} />}
      ItemSeparatorComponent={
        <View style={{ width: dimensions.sectionHorizontalGap }} />
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
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dishCard: {
    justifyContent: "space-between",
    width: dimensions.dishCard1W,
    gap: dimensions.subSectionVerticalGap,
  },
  dishCardImageContainer: {
    height: dimensions.dishCard1H,
    width: dimensions.dishCard1W,
  },
  dishCardImage: {
    height: dimensions.dishCard1H,
    width: dimensions.dishCard1W,
    borderRadius: dimensions.sectionBorderRadius,
  },
  userAvatar: {
    backgroundColor: colors.primary,
    height: dimensions.circleAvatarSize,
    width: dimensions.circleAvatarSize,
    borderRadius: dimensions.circleAvatarSize,
  },
  dishCardUserName: {
    fontSize: dimensions.fontSizeSmall,
    fontWeight: "medium",
    color: colors.onTertiary,
  },
  bookMarkButton: {
    position: "absolute",
    top: 5,
    right: 5,
    height: 45,
    width: 45,
    borderRadius: 25,
    backgroundColor: colors.background,
  },
});

export default RecommendationSection;
