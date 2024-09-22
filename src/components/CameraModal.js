import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import PropTypes from "prop-types";
import { colors } from "../themes/colors";
import { dimensions } from "../utils/dimensions";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import * as ImagePicker from "expo-image-picker";

const uriToBlob = async (uri) => {
  const response = await fetch(uri);
  const blob = await response.blob();
  return blob;
};

const CameraModal = ({ onSuccess, aspect }) => {
  const [disable, setDisable] = useState(false);

  const handleCameraThread = async () => {
    ImagePicker.requestCameraPermissionsAsync().then((granted) => {
      if (granted) {
        setDisable(true);
        ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: aspect || [16, 9],
          base64: true,
          quality: 0.5,
        })
          .then(async (result) => {
            if (!result.canceled) {
              try {
                const blobImage = await uriToBlob(result.assets[0].uri);
                onSuccess?.(blobImage, result.assets[0].uri);
              } catch (error) {
              }
            }
          })
          .finally(() => setDisable(false));
      }
    });
  };

  const handleGalleryThread = async () => {
    ImagePicker.requestMediaLibraryPermissionsAsync().then((granted) => {
      if (granted) {
        setDisable(true);
        ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: aspect || [16, 9],
          base64: true,
          quality: 0.5,
        })
          .then(async (result) => {
            if (!result.canceled) {
              try {
                const blobImage = await uriToBlob(result.assets[0].uri);
                onSuccess?.(blobImage, result.assets[0].uri);
              } catch (error) {
              }
            }
          })
          .finally(() => setDisable(false));
      }
    });
  };

  return (
    <View style={styles.cameraModal}>
      <Text style={styles.title}>Elige una opción para subir tu imagen</Text>
      <Pressable
        disabled={disable}
        style={styles.button}
        onPress={() => handleCameraThread()}
      >
        <Feather
          name="camera"
          size={dimensions.iconSize}
          color={colors.onPrimary}
        />
        <Text style={styles.subTitle}>Usar la cámara</Text>
      </Pressable>
      <Pressable
        disabled={disable}
        style={[styles.button, { backgroundColor: colors.background }]}
        onPress={() => handleGalleryThread()}
      >
        <FontAwesome
          name="photo"
          size={dimensions.iconSize}
          color={colors.onBackground}
        />
        <Text style={[styles.subTitle, { color: colors.onBackground }]}>
          Seleccionar de la galería
        </Text>
      </Pressable>
    </View>
  );
};

CameraModal.propTypes = {
  onSuccess: PropTypes.func,
  aspect: PropTypes.array,
};

export default CameraModal;

const styles = StyleSheet.create({
  cameraModal: {
    gap: dimensions.sectionHorizontalGap,
    paddingVertical: dimensions.layoutVerticalPadding,
    paddingHorizontal: dimensions.layoutHorizontalPadding,
    alignItems: "center",
  },
  title: {
    fontFamily: "PoppinsBold",
    fontSize: dimensions.fontSizeTitle,
    color: colors.primary,
    textAlign: "center",
  },
  subTitle: {
    flex: 1,
    fontFamily: "PoppinsMedium",
    fontSize: dimensions.fontSizeSubTitle,
    color: colors.onPrimary,
    textAlign: "center",
  },
  button: {
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: colors.primary,
    width: 200,
    height: 60,
    gap: dimensions.sectionHorizontalGap,
    paddingVertical: dimensions.sectionVerticalPadding,
    paddingHorizontal: dimensions.sectionHorizontalPadding,
    borderRadius: dimensions.sectionBorderRadius,
    borderWidth: 2,
    borderColor: colors.primary,
  },
});
