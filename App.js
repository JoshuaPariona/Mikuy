import { StatusBar } from "expo-status-bar";
import { ScrollView, StyleSheet, View } from "react-native";
import AppBar from "./src/components/AppBar";
import React, { useState } from "react";

export default function App() {
  const [isAtTop, setIsAtTop] = useState(true);

  const handleScroll = (event) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    if (offsetY <= 0) {
      if (isAtTop == false) {
        console.log("scrollTop");
        setIsAtTop(true);
      }
    } else {
      if (isAtTop == true) {
        console.log("scrollDown");
        setIsAtTop(false);
      }
    }
  };

  return (
    <View style={styles.container}>
      <AppBar isAtTop={isAtTop} />
      <ScrollView
        style={{ flex: 1, zIndex: -1 }}
        keyboardDismissMode="on-drag"
        //showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={handleScroll}
      >
        <View style={styles.box}></View>
        <View style={styles.box}></View>
        <View style={styles.box}></View>
        <View style={styles.box}></View>
        <View style={styles.box}></View>
        <View style={styles.box}></View>
        <View style={styles.box}></View>
        <View style={styles.box}></View>
        <View style={styles.box}></View>
      </ScrollView>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  box: {
    margin: 40,
    height: 100,
    backgroundColor: "red",
  },
});
