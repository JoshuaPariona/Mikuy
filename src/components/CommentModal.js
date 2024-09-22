import { Image, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import { dimensions } from "../utils/dimensions";
import { images } from "../utils/images";
import PrincipalButtonView from "./PrincipalButtonView";
import { colors } from "../themes/colors";
import { useGetCurrentUserQuery } from "../services/user";
import PressableRatingStars from "./PressableRatingStars";
import {
  usePatchRecipeRatingMutation,
  usePostIndividualRecipeRatingMutation,
} from "../services/recipe";
import AuthServices from "../services/AuthServices";

const CommentModal = ({ rating, recipeId, onSuccess }) => {
  const { data: user, isLoading } = useGetCurrentUserQuery();
  const [triggerPostRating] = usePostIndividualRecipeRatingMutation();

  //FIXME: sever side
  const [triggerPatchRating] = usePatchRecipeRatingMutation();

  const [disable, setDisable] = useState(false);

  const [stars, setStars] = useState(3);
  const [comment, setComment] = useState("");

  if (isLoading) return <View />;

  const source = user.image ? { uri: user.image } : images.userMikuy;

  const handlePostReview = () => {
    setDisable(true);
    AuthServices.getCurrentAuthUser()
      .getIdToken()
      .then((idToken) => {
        Promise.all([
          triggerPostRating({
            recipeId,
            idToken,
            individualRating: {
              rating: stars + 1,
              review: comment.trim(),
            },
          }).unwrap(),
          triggerPatchRating({
            currentTotalRating: rating.totalRating || 0,
            currentAveRating: rating.averageRating || 0,
            lastRating: stars + 1,
            recipeId,
            idToken,
          }).unwrap(),
        ])
          .then(() => {
            setStars(3);
            setComment("");
            onSuccess?.();
          })
          .finally(() => setDisable(false));
      });
  };

  return (
    <View
      style={[
        styles.layout,
        {
          width: "100%",
          paddingVertical: dimensions.layoutVerticalPadding,
          alignItems: "center",
        },
      ]}
    >
      <Text style={styles.title}>Comentario</Text>
      <Image style={styles.userImage} source={source} />
      <Text style={styles.subTitle}>{user.name}</Text>
      <PressableRatingStars
        stars={stars}
        onStarPress={(stars) => setStars(stars)}
      />
      <TextInput
        style={styles.textInput}
        multiline
        maxLength={200}
        placeholder="Escribe un comentario."
        textAlignVertical="top"
        cursorColor={colors.primary}
        value={comment}
        onChangeText={(text) => setComment(text)}
      />
      <PrincipalButtonView
        style={styles.sendButton}
        onPress={() => {
          if (disable) return;
          handlePostReview();
        }}
      >
        <Text style={styles.sendButtonLabel}>Enviar</Text>
      </PrincipalButtonView>
    </View>
  );
};

export default CommentModal;

const styles = StyleSheet.create({
  layout: {
    paddingHorizontal: dimensions.layoutHorizontalPadding,
    paddingVertical: dimensions.layoutVerticalPadding,
    gap: dimensions.sectionVerticalGap,
  },
  userImage: {
    height: dimensions.circleAvatarSizeLarge,
    width: dimensions.circleAvatarSizeLarge,
    borderRadius: 35,
  },
  textInput: {
    width: "100%",
    height: 120,
    borderRadius: dimensions.sectionBorderRadius,
    borderColor: colors.onTertiary,
    borderWidth: 2,
    paddingVertical: dimensions.sectionVerticalPadding,
    paddingHorizontal: dimensions.sectionHorizontalPadding,
    justifyContent: "center",
    fontFamily: "PoppinsRegular",
    fontSize: dimensions.fontSizeSubTitle,
  },
  title: {
    fontFamily: "PoppinsMedium",
    fontSize: dimensions.fontSizeTitle,
    color: colors.onBackground,
  },
  subTitle: {
    fontFamily: "PoppinsRegular",
    fontSize: dimensions.fontSizeSubTitle,
    color: colors.onBackground,
  },
  sendButton: {
    paddingHorizontal: 50,
    borderRadius: 15,
    paddingVertical: 15,
  },
  sendButtonLabel: {
    color: colors.onPrimary,
    fontSize: dimensions.fontSizeSubTitle,
    fontFamily: "PoppinsBold",
  },
});
