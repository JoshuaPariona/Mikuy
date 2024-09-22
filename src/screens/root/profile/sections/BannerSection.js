import {
  StyleSheet,
  Image,
  View,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useState } from "react";
import Feather from "@expo/vector-icons/Feather";
import { images } from "../../../../utils/images";
import { colors } from "../../../../themes/colors";
import { dimensions } from "../../../../utils/dimensions";
import {
  useGetCurrentUserQuery,
  usePatchUserMutation,
} from "../../../../services/user";
import { BottomSheetContext } from "../../../../context/BottomSheetProvider";
import CameraModal from "../../../../components/CameraModal";
import StorageServices from "../../../../services/StorageServices";
import AuthServices from "../../../../services/AuthServices";
import AnimatedShimmerLoading from "../../../../components/animated/AnimatedShimerLoading";

const BannerSection = () => {
  const { data: user, isLoading } = useGetCurrentUserQuery();
  const [triggerPatchUser] = usePatchUserMutation();
  const { openBottomSheet, closeBottomSheet, setSheetContent } =
    useContext(BottomSheetContext);

  const [isLoadingBanner, setIsLoadingBanner] = useState(false);
  const [isLoadingImage, setIsLoadingImage] = useState(false);

  if (isLoading) return <View></View>;

  const sourceBanner = user.banner
    ? { uri: user.banner }
    : images.userMikuyBanner;

  const sourceImage = user.image ? { uri: user.image } : images.userMikuy;

  const handleOnBannerImageSelected = (image) => {
    StorageServices.putUserBanner({
      userId: AuthServices.getCurrentAuthUser().uid,
      image,
      onSuccess: (downloadURL) => {
        AuthServices.getCurrentAuthUser()
          .getIdToken()
          .then((idToken) => {
            triggerPatchUser({
              idToken,
              user: {
                banner: downloadURL,
              },
            }).finally(() => {
              setIsLoadingBanner(false);
            });
          });
        closeBottomSheet();
      },
      onFinally: () => {
        setIsLoadingBanner(true);
      },
    });
  };

  const handleOnUserImageSelected = (image) => {
    StorageServices.putUserImage({
      userId: AuthServices.getCurrentAuthUser().uid,
      image,
      onSuccess: (downloadURL) => {
        AuthServices.getCurrentAuthUser()
          .getIdToken()
          .then((idToken) => {
            triggerPatchUser({
              idToken,
              user: {
                image: downloadURL,
              },
            }).finally(() => {
              setIsLoadingImage(false);
            });
          });
        closeBottomSheet();
      },
      onFinally: () => {
        setIsLoadingImage(true);
      },
    });
  };

  return (
    <View>
      <View>
        {isLoadingBanner ? (
          <AnimatedShimmerLoading style={styles.banner} />
        ) : (
          <Image style={styles.banner} source={sourceBanner} />
        )}
        <TouchableOpacity
          activeOpacity={0.85}
          style={styles.bannerCamera}
          onPress={() => {
            setSheetContent(
              <CameraModal
                key={"banner-user"}
                onSuccess={(image) => handleOnBannerImageSelected(image)}
              />
            );
            openBottomSheet();
          }}
        >
          <Feather
            name="camera"
            size={dimensions.iconSize}
            color={colors.onPrimary}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.avatarContainer}>
        {isLoadingImage ? (
          <AnimatedShimmerLoading style={styles.avatarImg} />
        ) : (
          <Image style={styles.avatarImg} source={sourceImage} />
        )}
        <TouchableOpacity
          activeOpacity={0.85}
          style={styles.avatarCamera}
          onPress={() => {
            setSheetContent(
              <CameraModal
                key={"image-user"}
                aspect={[1, 1]}
                onSuccess={(image) => handleOnUserImageSelected(image)}
              />
            );
            openBottomSheet();
          }}
        >
          <Feather
            name="camera"
            size={dimensions.iconSize}
            color={colors.onPrimary}
          />
        </TouchableOpacity>
      </View>
      <View style={{ height: (dimensions.circleAvatarSizeXLarge + 15) / 2 }} />
    </View>
  );
};

const styles = StyleSheet.create({
  banner: {
    width: "100%",
    height: dimensions.profileBannerHeight,
    borderColor: colors.onBackground
  },
  bannerCamera: {
    position: "absolute",
    top: dimensions.layoutVerticalPadding,
    right: dimensions.layoutHorizontalPadding,
    backgroundColor: colors.onTertiary,
    width: dimensions.iconSize + 10,
    height: dimensions.iconSize + 10,
    borderRadius: dimensions.iconSize,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarContainer: {
    width: dimensions.circleAvatarSizeXLarge + 15,
    height: dimensions.circleAvatarSizeXLarge + 15,
    borderRadius: dimensions.circleAvatarSizeXLarge,
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    alignSelf: "center",
    top:
      dimensions.profileBannerHeight -
      (dimensions.circleAvatarSizeXLarge + 15) / 2,
  },
  avatarImg: {
    width: dimensions.circleAvatarSizeXLarge,
    height: dimensions.circleAvatarSizeXLarge,
    borderRadius: dimensions.circleAvatarSizeXLarge,
  },
  avatarCamera: {
    position: "absolute",
    bottom: 8,
    right: 8,
    backgroundColor: colors.primary,
    width: dimensions.iconSize + 10,
    height: dimensions.iconSize + 10,
    borderRadius: dimensions.iconSize,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default BannerSection;
