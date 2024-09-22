import { Easing, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { colors } from "../../../themes/colors";
import { dimensions } from "../../../utils/dimensions";
import PropTypes from "prop-types";
import AnimatedExpandableView from "../../../components/animated/AnimatedExpandableView";

const BottomNavBar = ({ tabNavigator, pageIndex, tabs }) => {
  const onNav = (index) => {
    tabNavigator.slideToIndex(index);
  };

  return (
    <View style={styles.bottomNav}>
      {tabs.map((item, index) => {
        return (
          <NavItem
            key={item.routeName}
            index={index}
            isCurrent={index === pageIndex}
            item={item}
            onNav={onNav}
          />
        );
      })}
    </View>
  );
};

BottomNavBar.propTypes = {
  pageIndex: PropTypes.number.isRequired,
  tabs: PropTypes.array.isRequired,
  tabNavigator: PropTypes.any,
};

const NavItem = ({ item, index, isCurrent, onNav }) => {
  return (
    <Pressable
      style={styles.navItem}
      onPress={() => {
        onNav(index);
      }}
    >
      {item.icon}
      <AnimatedExpandableView
        visibility={isCurrent}
        minSize={[null, 0]}
        maxSize={[null, 16]}
        duration={150}
        easing={Easing.ease}
      >
        <Text style={styles.navItemLabel}>{item.name}</Text>
      </AnimatedExpandableView>
    </Pressable>
  );
};

NavItem.propTypes = {
  index: PropTypes.number.isRequired,
  item: PropTypes.object.isRequired,
  isCurrent: PropTypes.bool.isRequired,
  onNav: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  bottomNav: {
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
    fontFamily: "PoppinsRegular",
    color: colors.onPrimary,
    fontSize: dimensions.fontSizeSmall,
  },
});

export default BottomNavBar;
