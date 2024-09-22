import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import RecipeButton from "../../../components/RecipeButton";
import BookMarkButton from "../../../components/BookMarkButton";
import { useGetUserByIdQuery } from "../../../services/user";
import AuthorButton from "../../../components/AuthorButton";
import { useGetRecipeByIdQuery } from "../../../services/recipe";
import { dimensions } from "../../../utils/dimensions";
import { colors } from "../../../themes/colors";
import TimerLabel from "../../../components/TimerLabel";
import AnimatedShimmerLoading from "../../../components/animated/AnimatedShimerLoading";

const RecipeItemCompact = ({ recipeId }) => {
  const { data: recipe, isLoading } = useGetRecipeByIdQuery(recipeId);

  if (isLoading) {
    return (
      <View style={styles.recipeCard}>
        <AnimatedShimmerLoading
          style={[
            styles.recipeCardImageContainer,
            { borderRadius: dimensions.sectionBorderRadius },
          ]}
        />
        <AnimatedShimmerLoading
          style={{ borderRadius: dimensions.sectionBorderRadius, height: 40 }}
        />
        <View style={{ flexDirection: "row" }}>
          <AnimatedShimmerLoading style={styles.userAvatar} />
          <AnimatedShimmerLoading
            style={{ flex: 1, borderRadius: dimensions.sectionBorderRadius }}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.recipeCard}>
      <View style={styles.recipeCardImageContainer}>
        <RecipeButton recipeId={recipeId}>
          <Image
            style={styles.recipeCardImage}
            source={{
              uri: recipe.thumbnail,
            }}
          />
        </RecipeButton>
        <BookMarkButton
          recipeId={recipeId}
          recipe={recipe}
          style={styles.bookMarkButton}
        />
      </View>
      <Text style={styles.subTitle}>{recipe.name}</Text>
      <AuthorDetail
        authorId={recipe.authorId}
        recipeDuration={recipe.duration}
      />
    </View>
  );
};

const AuthorDetail = ({ authorId = "", recipeDuration = 0 }) => {
  const { data: user, isLoading } = useGetUserByIdQuery(authorId);

  if (isLoading) {
    return <View />;
  }

  return (
    <View
      style={{
        flexDirection: "row",
        gap: dimensions.subSectionHorizontalGap,
      }}
    >
      <AuthorButton authorId={authorId}>
        <Image
          style={styles.userAvatar}
          source={{
            uri: user.image,
          }}
        />
      </AuthorButton>
      <View style={{ justifyContent: "space-between", flex: 1 }}>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={styles.recipeCardUserName}
        >
          De {user.name}
        </Text>
        <TimerLabel time={recipeDuration} />
      </View>
    </View>
  );
};

export default RecipeItemCompact;

const styles = StyleSheet.create({
  subTitle: {
    fontFamily: "PoppinsMedium",
    fontSize: dimensions.fontSizeSubTitle,
    color: colors.onBackground,
  },
  recipeCard: {
    justifyContent: "space-between",
    width: dimensions.dishCard1W,
    gap: dimensions.subSectionVerticalGap,
  },
  recipeCardImageContainer: {
    height: dimensions.dishCard1H,
    width: dimensions.dishCard1W,
  },
  recipeCardImage: {
    height: dimensions.dishCard1H,
    width: dimensions.dishCard1W,
    borderRadius: dimensions.sectionBorderRadius,
  },
  userAvatar: {
    backgroundColor: colors.primary,
    height: dimensions.circleAvatarSize,
    width: dimensions.circleAvatarSize,
    borderRadius: dimensions.circleAvatarSize,
  },
  recipeCardUserName: {
    fontFamily: "PoppinsRegular",
    fontSize: dimensions.fontSizeSmall,
    color: colors.onTertiary,
  },
  bookMarkButton: {
    position: "absolute",
    top: 5,
    right: 5,
    height: 45,
    width: 45,
    borderRadius: 25,
    backgroundColor: colors.background,
  },
});
