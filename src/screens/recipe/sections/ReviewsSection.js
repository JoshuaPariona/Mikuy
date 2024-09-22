import { Pressable, StyleSheet, Text, View, Image } from "react-native";
import React, { useContext } from "react";
import { colors } from "../../../themes/colors";
import { images } from "../../../utils/images";
import { dimensions } from "../../../utils/dimensions";
import RatingStars from "../../../components/RatingStars";
import {
  useGetCurrentUserQuery,
  useGetUserByIdQuery,
} from "../../../services/user";
import { useSelector } from "react-redux";
import { BottomSheetContext } from "../../../context/BottomSheetProvider";
import SignInModal from "../../../components/SignInModal";
import CommentModal from "../../../components/CommentModal";
import AuthorButton from "../../../components/AuthorButton";
import { isLoading } from "expo-font";

const ReviewsSection = ({ recipeId, rating = {} }) => {
  const { authUser } = useSelector((state) => state.auth);
  const { setSheetContent, openBottomSheet, closeBottomSheet } =
    useContext(BottomSheetContext);

  const handleComment = () => {
    setSheetContent(
      authUser ? (
        <CommentModal
          rating={rating}
          recipeId={recipeId}
          onSuccess={() => closeBottomSheet()}
        />
      ) : (
        <SignInModal onDismiss={() => closeBottomSheet()} />
      )
    );
    openBottomSheet();
  };

  return (
    <View style={styles.layout}>
      <View style={styles.section}>
        <Text style={styles.title}>{`Comentarios (${
          rating.totalRating || 0
        })`}</Text>
        <View style={styles.row}>
          <RatingStars rating={rating.averageRating || 0} />
          <Text style={styles.subTitle}>
            {`${(rating.averageRating || 0).toFixed(1)} / 5`}
          </Text>
        </View>
        <View style={styles.row}>
          {authUser ? <SigInUserImage /> : null} 
          <Pressable style={styles.textInput} onPress={() => handleComment()}>
            <Text style={styles.placeHolder}>Escribir un comentario.</Text>
          </Pressable>
        </View>
      </View>
      <View
        style={{ width: "100%", height: 2, backgroundColor: colors.primary }}
      />
      <View style={styles.layout}>
        {rating.individualRating?.map((review) => (
          <ReviewItem key={review.id} review={review} />
        ))}
      </View>
    </View>
  );
};

const SigInUserImage = () => {
  const { data: user, isLoading } = useGetCurrentUserQuery();

  if (isLoading) return <View />;

  const source = user.image ? { uri: user.image } : images.userMikuy;

  return <Image style={styles.userImage} source={source} />;
};

const ReviewItem = ({ review = {} }) => {
  const { data: user, isLoading } = useGetUserByIdQuery(review.authorId);

  if (isLoading) return null;

  const source = user.image? {uri: user.image}: images.userMikuy

  return (
    <View style={styles.section}>
      <View style={[styles.row, { flex: 1 }]}>
        <AuthorButton authorId={review.authorId}>
          <Image style={styles.userImage} source={source} />
        </AuthorButton>
        <View style={{ gap: 10, flex: 1 }}>
          <View style={[styles.row, { justifyContent: "space-between" }]}>
            <Text
              style={[styles.subTitle, styles.userName]}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {user.name}
            </Text>
            <Text style={styles.date}>
              {new Intl.DateTimeFormat("es-ES", {
                day: "numeric",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              }).format(new Date(review.createdAt))}
            </Text>
          </View>
          <RatingStars
            rating={review.rating || 0}
            size={dimensions.smallIconSize}
          />
        </View>
      </View>
      <Text style={[styles.review]}>{review.review}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  layout: {
    gap: dimensions.layoutVerticalGap,
  },
  section: {
    width: "100%",
    gap: dimensions.sectionVerticalGap,
  },
  row: {
    flexDirection: "row",
    gap: dimensions.sectionHorizontalGap,
    alignItems: "center",
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
  userName: {
    width: 120,
    overflow: "hidden",
  },
  rating: {
    fontFamily: "PoppinsRegular",
    fontSize: dimensions.fontSizeMedium,
    color: colors.primary,
  },
  date: {
    fontFamily: "PoppinsRegular",
    fontSize: dimensions.fontSizeSmall,
    color: colors.onTertiary,
  },
  userImage: {
    height: dimensions.circleAvatarSizeMedium,
    width: dimensions.circleAvatarSizeMedium,
    borderRadius: 25,
  },
  textInput: {
    flex: 1,
    height: 40,
    borderRadius: dimensions.sectionBorderRadius,
    borderColor: colors.onTertiary,
    borderWidth: 2,
    paddingHorizontal: dimensions.sectionHorizontalPadding,
    justifyContent: "center",
  },
  placeHolder: {
    fontFamily: "PoppinsRegular",
    fontSize: dimensions.fontSizeSubTitle,
    color: colors.onTertiary,
  },
  review: {
    fontFamily: "PoppinsRegular",
    fontSize: dimensions.fontSizeSubTitle,
    color: colors.onTertiary,
  },
});

export default ReviewsSection;
