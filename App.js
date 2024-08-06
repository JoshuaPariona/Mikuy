import { StatusBar } from "expo-status-bar";
import { StyleSheet, Animated, View, ScrollView } from "react-native";
import AppBar from "./src/components/AppBar";
import React, { useRef, useState } from "react";
import Home from "./src/screens/home/Home";
import { colors } from "./src/themes/colors";
import { dimensions } from "./src/utils/dimensions";
import BottomNavBar from "./src/components/BottomNavBar";
import Notifier from "./src/components/Notifier";

export default function App() {
  const scrollOffsetY = useRef(new Animated.Value(0)).current;

  const maxAppBarHeight =
    dimensions.statusbar +
    dimensions.layoutVerticalPadding +
    dimensions.iconSize +
    24 + // input padding
    54 + // logo height
    dimensions.layoutVerticalGap * 2 +
    dimensions.circleAvatarSizeLarge;

  const [page, setPage] = useState(2);

  const handleNavigation = (page) => {
    setPage(page);
  };

  return (
    <View style={styles.container}>
      <AppBar animScrollOffsetY={scrollOffsetY} />
      <ScrollView
        contentContainerStyle={{ paddingTop: maxAppBarHeight }}
        keyboardDismissMode="on-drag"
        overScrollMode="never"
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollOffsetY } } }],
          { useNativeDriver: false }
        )}
        showsVerticalScrollIndicator={false}
      >
        <Home />
      </ScrollView>
      <Notifier />
      <BottomNavBar page={page} onNav={handleNavigation} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
