import { Easing, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { colors } from "../themes/colors";
import { dimensions } from "../utils/dimensions";
import PropTypes from "prop-types";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";
import Foundation from "@expo/vector-icons/Foundation";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import moment from "moment";
import AnimatedExpandableView from "./animated/AnimatedExpandableView";

const day = moment().format("DD");

const pages = [
  {
    id: 0,
    name: "Recetario",
    icon: (
      <FontAwesome
        name={"book"}
        size={dimensions.iconSize}
        color={colors.onPrimary}
      />
    ),
  },
  {
    id: 1,
    name: "Horario",
    icon: (
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Ionicons
          name={"calendar-clear"}
          size={dimensions.iconSize}
          color={colors.onPrimary}
        />
        <Text
          style={{
            paddingTop: 5,
            position: "absolute",
            fontSize: 14,
            fontWeight: "bold",
            color: colors.primary,
          }}
        >
          {day}
        </Text>
      </View>
    ),
  },
  {
    id: 2,
    name: "Inicio",
    icon: (
      <Foundation
        name={"home"}
        size={dimensions.iconSize}
        color={colors.onPrimary}
      />
    ),
  },
  {
    id: 3,
    name: "Lista",
    icon: (
      <MaterialCommunityIcons
        name={"bookmark-minus"}
        size={dimensions.iconSize}
        color={colors.onPrimary}
      />
    ),
  },
  {
    id: 4,
    name: "Perfil",
    icon: <FontAwesome5 name={"user-alt"} size={20} color={colors.onPrimary} />,
  },
];

const BottomNavBar = (props) => {
  const { page, onNav } = props;
  return (
    <View style={styles.bottomNav}>
      {pages.map((item) => {
        return (
          <NavItem
            key={item.id}
            isCurrent={item.id == page}
            item={item}
            onItem={onNav}
          />
        );
      })}
    </View>
  );
};

BottomNavBar.propTypes = {
  page: PropTypes.number.isRequired,
  onNav: PropTypes.func.isRequired,
};

const NavItem = (props) => {
  const { item, isCurrent, onItem } = props;

  return (
    <Pressable
      style={styles.navItem}
      onPress={() => {
        onItem(item.id);
      }}
    >
      {item.icon}
      <AnimatedExpandableView
        visibility={isCurrent}
        minSize={[null, 0]}
        maxSize={[null, 16]}
        easing={Easing.ease}
      >
        <Text style={styles.navItemLabel}>{item.name}</Text>
      </AnimatedExpandableView>
    </Pressable>
  );
};

NavItem.propTypes = {
  item: PropTypes.object.isRequired,
  isCurrent: PropTypes.bool.isRequired,
  onItem: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  bottomNav: {
    zIndex: 2,
    height: dimensions.bottomNavBarHeight,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: colors.primary,
    borderTopRightRadius: dimensions.layoutBorderRadius,
    borderTopLeftRadius: dimensions.layoutBorderRadius,
    paddingHorizontal: dimensions.layoutHorizontalPadding,
    paddingVertical: dimensions.layoutVerticalPadding,
  },
  navItem: {
    justifyContent: "center",
    alignItems: "center",
    width: 60,
  },
  navItemLabel: {
    color: colors.onPrimary,
    fontSize: dimensions.fontSizeSmall,
    fontWeight: "regular",
  },
});

export default BottomNavBar;
