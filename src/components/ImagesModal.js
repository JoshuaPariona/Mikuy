import { Image, Platform, StatusBar, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import PagerView from "react-native-pager-view";
import { dimensions } from "../utils/dimensions";
import PopButton from "./PopButton";
import PagerIndicator from "./PagerIndicator";

const ImagesModal = ({ images = [], setModalVisible }) => {
  const [currentPage, setCurrentPage] = useState(0);
  return (
    <View style={styles.imagesModal}>
      <PagerView
        style={{
          width: "100%",
          flex: 1,
          gap: 40,
        }}
        overScrollMode="never"
        initialPage={0}
        onPageSelected={(event) => setCurrentPage(event.nativeEvent.position)}
      >
        {images.map((item, index) => (
          <View
            key={`image-${index * 1}`}
            style={{
              width: "100%",
              flex: 1,
              justifyContent: "center",
            }}
          >
            <Image style={styles.image} source={{ uri: item }} />
          </View>
        ))}
      </PagerView>
      <PagerIndicator style={styles.pagerIndicator} page={currentPage} indicatorsLength={images.length} />
      <PopButton
        style={styles.popButton}
        popOverwrittenFunc={() => setModalVisible(false)}
      />
    </View>
  );
};

export default ImagesModal;

const styles = StyleSheet.create({
  imagesModal: {
    flex: 1,
    backgroundColor: "rgba(41, 41, 41, 0.65)",
  },
  image: {
    width: "100%",
    height: 300,
  },
  popButton: {
    position: "absolute",
    top:
      Platform.OS === "android"
        ? (StatusBar.currentHeight || 0) + dimensions.layoutVerticalPadding
        : dimensions.layoutVerticalPadding,
    left: dimensions.layoutHorizontalPadding,
  },
  pagerIndicator: {
    alignSelf: "center"
  }
});
