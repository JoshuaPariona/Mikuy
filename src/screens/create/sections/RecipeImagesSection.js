import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AddButton from "../../../components/AddButton";
import Feather from "@expo/vector-icons/Feather";
import React, { useContext, useState } from "react";
import { dimensions } from "../../../utils/dimensions";
import { colors } from "../../../themes/colors";
import { BottomSheetContext } from "../../../context/BottomSheetProvider";
import CameraModal from "../../../components/CameraModal";

const RecipeImagesSection = ({ setThumbnail, setImages }) => {
  const { setSheetContent, openBottomSheet, closeBottomSheet } =
    useContext(BottomSheetContext);

  //uri elements
  const [localThumbnail, setLocalThumbnail] = useState(undefined);
  const [localImages, setLocalImages] = useState([]);

  const handleAddThumbnail = () => {
    setSheetContent(
      <CameraModal
        key={"create-camera-thumbnail"}
        onSuccess={(image, uri) => {
          setThumbnail(image)
          setLocalThumbnail(uri);
          closeBottomSheet();
        }}
      />
    );
    openBottomSheet();
  };

  const handleAddImage = (index) => {
    setSheetContent(
      <CameraModal
        key={"create-camera-images"}
        onSuccess={(image, uri) => {
          setImages((prevImages) => {
            const newImages = [...prevImages];
            newImages[index] = image;
            return newImages;
          });
          setLocalImages((prevImages) => {
            const newImages = [...prevImages];
            newImages[index] = uri;
            return newImages;
          });
          closeBottomSheet();
        }}
      />
    );
    openBottomSheet();
  };

  return (
    <View style={styles.section}>
      <View style={styles.row}>
        <Text style={styles.subTitle}>Agregar fotos:</Text>
        {!localThumbnail && <Text style={styles.obligatory}>*</Text>}
      </View>
      <View style={styles.addPhotoContainer}>
        <View style={styles.photo}>
          <Image
            style={styles.imageThumbnail}
            source={{ uri: localThumbnail }}
          />
          <TouchableOpacity
            activeOpacity={0.85}
            style={styles.addThumbnail}
            onPress={() => handleAddThumbnail()}
          >
            <Feather
              name="camera"
              size={dimensions.iconSize}
              color={colors.onBackground}
            />
            <Text style={styles.addLabel}>Agregar Portada</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.addImagesContainer}>
          <View style={styles.photo}>
            <Image style={styles.image} source={{ uri: localImages[0] }} />
            <AddButton
              style={styles.addButton}
              onPress={() => handleAddImage(0)}
            />
          </View>
          <View style={styles.photo}>
            <Image style={styles.image} source={{ uri: localImages[1] }} />
            <AddButton
              style={styles.addButton}
              onPress={() => handleAddImage(1)}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default RecipeImagesSection;

const styles = StyleSheet.create({
  section: {
    gap: dimensions.sectionVerticalGap,
  },
  row: {
    gap: dimensions.sectionHorizontalGap,
    flexDirection: "row",
    alignItems: "center",
  },
  subTitle: {
    fontFamily: "PoppinsMedium",
    fontSize: dimensions.fontSizeSubTitle,
    color: colors.onBackground,
  },
  obligatory: {
    color: colors.error,
  },
  addButton: {
    position: "absolute",
  },
  addPhotoContainer: {
    height: dimensions.dishCard2H,
    width: "100%",
    flexDirection: "row",
    gap: dimensions.sectionHorizontalGap,
  },
  addImagesContainer: {
    flex: 1,
    gap: dimensions.sectionHorizontalGap,
  },
  photo: {
    borderRadius: dimensions.sectionBorderRadius,
    borderColor: colors.primary,
    borderStyle: "dashed",
    borderWidth: 2,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    height: "105%",
    width: "103%",
    borderRadius: dimensions.sectionBorderRadius,
  },
  imageThumbnail: {
    height: dimensions.dishCard2H,
    width: "103%",
    borderRadius: dimensions.sectionBorderRadius,
  },
  addThumbnail: {
    position: "absolute",
    width: 140,
    bottom: 15,
    backgroundColor: colors.surface,
    borderRadius: 15,
    flexDirection: "row",
    paddingHorizontal: dimensions.sectionHorizontalPadding,
    paddingVertical: 5,
    alignItems: "center",
    alignSelf: "center",
  },
  addLabel: {
    flex: 1,
    fontFamily: "PoppinsRegular",
    fontSize: dimensions.fontSizeSubTitle,
    color: colors.onBackground,
    textAlign: "center",
  },
});
