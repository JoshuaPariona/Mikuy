import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { dimensions } from "../../../utils/dimensions";
import { colors } from "../../../themes/colors";
import PropTypes from "prop-types";
import BookMarkButton from "../../../components/BookMarkButton";
import TimerLabel from "../../../components/TimerLabel";
import LevelLabel from "../../../components/LevelLabel";

const dishes = require("../../../data/dishes.json");
const users = require("../../../data/users.json");

const PopularSection = () => {
  return (
    <View style={styles.section}>
      <View style={styles.header}>
        <Text style={styles.title}>Recetas populares</Text>
        <Text
          style={styles.moreButton}
          onPress={() => {
            console.log("ver mas");
          }}
        >
          Ver más
        </Text>
      </View>
      <View style={{ gap: dimensions.layoutVerticalGap }}>
        {dishes.map((item) => (
          <PopularItem key={item.id} item={item} />
        ))}
      </View>
    </View>
  );
};

const PopularItem = (props) => {
  const { item } = props;
  const user = users.find((user) => user.id === item.by_id); //FIXME: User not found

  return (
    <View style={styles.dishCard}>
      <Image
        style={styles.dishCardImage}
        source={{
          uri: item.image,
        }}
      />
      <View style={styles.subSection}>
        <View style={styles.header}>
          <Text style={[styles.subTitle, { flex: 1 }]}>{item.name}</Text>
          <BookMarkButton item={item} initialState={false} />
        </View>
        <Text style={styles.description}>
          Lorem: Salmón al horno acompañado de una mezcla de verduras frescas,
          sazonado con hierbas y especias.{" "}
        </Text>
        <Text style={styles.userName}>De {user.name}</Text>
        <View style={styles.header}>
          <TimerLabel time={item.duration}/>
          <LevelLabel level={item.difficulty}/>
        </View>
      </View>
    </View>
  );
};

PopularItem.propTypes = {
  item: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  section: {
    flex: 1,
    gap: dimensions.sectionVerticalGap,
  },
  subSection: {
    flex: 1,
    justifyContent: "space-between",
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
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  moreButton: {
    fontSize: dimensions.fontSizeSmall,
    fontWeight: "medium",
    color: colors.onTertiary,
  },
  dishCard: {
    flexDirection: "row",
    gap: dimensions.subSectionHorizontalGap,
  },
  dishCardImage: {
    width: dimensions.dishCard2W,
    height: dimensions.dishCard2H,
    borderRadius: dimensions.sectionBorderRadius,
  },
  description: {
    fontSize: dimensions.fontSizeSmall,
    fontWeight: "medium",
    color: colors.onBackground,
  },
  userName: {
    fontSize: dimensions.fontSizeSmall,
    fontWeight: "medium",
    color: colors.onTertiary,
  }
});

export default PopularSection;
