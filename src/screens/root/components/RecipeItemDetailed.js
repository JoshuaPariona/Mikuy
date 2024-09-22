import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import RecipeButton from "../../../components/RecipeButton";
import { useGetRecipeByIdQuery } from "../../../services/recipe";
import { useGetUserByIdQuery } from "../../../services/user";
import TimerLabel from "../../../components/TimerLabel";
import LevelLabel from "../../../components/LevelLabel";
import BookMarkButton from "../../../components/BookMarkButton";
import { dimensions } from "../../../utils/dimensions";
import { colors } from "../../../themes/colors";
import { useSelector } from "react-redux";
import EditRecipeButton from "../../../components/EditRecipeButton";
import AuthorButton from "../../../components/AuthorButton";
import AnimatedShimmerLoading from "../../../components/animated/AnimatedShimerLoading";

const RecipeItemDetailed = ({ recipeId }) => {
  const { authUser } = useSelector((state) => state.auth);
  const { data: recipe, isLoading } = useGetRecipeByIdQuery(recipeId);

  if (isLoading) {
    return (
      <View style={styles.recipeCard}>
        <AnimatedShimmerLoading style={styles.recipeCardImage} />
        <View style={styles.subSection}>
          <AnimatedShimmerLoading
            style={{
              height: 140,
              borderRadius: dimensions.sectionBorderRadius,
            }}
          />
          <AnimatedShimmerLoading
            style={{ height: 30, borderRadius: dimensions.sectionBorderRadius }}
          />
        </View>
      </View>
    );
  }
  
  const isAuthor = authUser ? authUser.uid === recipe.authorId : false;

  return (
    <View style={styles.recipeCard}>
      <RecipeButton recipeId={recipeId}>
        <Image
          style={styles.recipeCardImage}
          source={{
            uri: recipe.thumbnail,
          }}
        />
      </RecipeButton>
      <View style={styles.subSection}>
        <View style={styles.header}>
          <Text style={[styles.subTitle, { flex: 1 }]}>{recipe.name}</Text>
          {isAuthor ? (
            <EditRecipeButton recipe={recipe} />
          ) : (
            <BookMarkButton recipeId={recipeId} recipe={recipe} />
          )}
        </View>
        <Text style={styles.description}>{recipe.description}</Text>
        {isAuthor ? null : <AuthorNickName authorId={recipe.authorId} />}
        <View style={styles.header}>
          <TimerLabel time={recipe.duration || 0} />
          <LevelLabel level={recipe.difficulty} />
        </View>
      </View>
    </View>
  );
};

const AuthorNickName = ({ authorId = "" }) => {
  const { data: author, isLoading } = useGetUserByIdQuery(authorId);
  if (isLoading) return <View></View>;
  return (
    <AuthorButton authorId={authorId}>
      <Text style={styles.userName}>@{author.nickname}</Text>
    </AuthorButton>
  );
};

export default RecipeItemDetailed;

const styles = StyleSheet.create({
  subSection: {
    flex: 1,
    justifyContent: "space-between",
  },
  subTitle: {
    fontFamily: "PoppinsMedium",
    fontSize: dimensions.fontSizeSubTitle,
    color: colors.onBackground,
  },
  header: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  recipeCard: {
    flexDirection: "row",
    gap: dimensions.subSectionHorizontalGap,
  },
  recipeCardImage: {
    width: dimensions.dishCard2W,
    height: dimensions.dishCard2H,
    borderRadius: dimensions.sectionBorderRadius,
  },
  description: {
    fontFamily: "PoppinsRegular",
    fontSize: dimensions.fontSizeSmall,
    color: colors.onBackground,
  },
  userName: {
    fontFamily: "PoppinsRegular",
    fontSize: dimensions.fontSizeSmall,
    color: colors.onTertiary,
  },
});
