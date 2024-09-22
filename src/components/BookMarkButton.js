import { Pressable, Text, View } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import React, { useContext, useState } from "react";
import AnimatedFadeSwitchComponent from "./animated/AnimatedFadeSwitchComponent";
import { dimensions } from "../utils/dimensions";
import { colors } from "../themes/colors";
import PropTypes from "prop-types";
import { NotifierContext } from "../context/NotifierProvider";
import AuthServices from "../services/AuthServices";
import {
  useDeleteMarkedUserRecipeMutation,
  useGetCurrentUserQuery,
  usePutMarkedUserRecipeMutation,
} from "../services/user";
import { BottomSheetContext } from "../context/BottomSheetProvider";
import SignInModal from "./SignInModal";
import { useSelector } from "react-redux";

const BookMarkButton = ({ style, recipeId, recipe = {}}) => {
  const { authUser } = useSelector((state) => state.auth);
  const { setSheetContent, openBottomSheet, closeBottomSheet } =
    useContext(BottomSheetContext);

  return authUser ? (
    <BookMarkButtonUserAction style={style} recipeId={recipeId} recipe={recipe} />
  ) : (
    <Pressable
      style={[
        style,
        {
          alignItems: "center",
          justifyContent: "center",
        },
      ]}
      onPress={() => {
        setSheetContent(
          <SignInModal
            key={"modal-bookmark"}
            onNavigation={() => closeBottomSheet()}
            onDismiss={() => closeBottomSheet()}
          />
        );
        openBottomSheet();
      }}
    >
      <MaterialCommunityIcons
        name="bookmark-minus-outline"
        size={dimensions.iconSize}
        color={colors.primary}
      />
    </Pressable>
  );
};

const BookMarkButtonUserAction = ({ style, recipeId, recipe }) => {
  const { data: user, isLoading: isLoadingUser } = useGetCurrentUserQuery();
  const { goNotification } = useContext(NotifierContext);

  const [triggerPutMarkedRecipe] = usePutMarkedUserRecipeMutation();
  const [triggerDeleteMarkedRecipe] = useDeleteMarkedUserRecipeMutation();

  const [isLoadingMutation, setIsLoadingMutation] = useState(false);

  if (isLoadingUser) {
    return <View />;
  }

  const isMarked = user.markedRecipes
    ? user.markedRecipes.includes(String(recipeId))
    : false;

  const handleNotificationOnMarked = () => {
    setIsLoadingMutation(true);
    AuthServices.getCurrentAuthUser()
      .getIdToken()
      .then((idToken) => {
        triggerPutMarkedRecipe({
          id: recipeId,
          idToken,
        })
          .then(() => {
            goNotification(
              <Text
                style={{
                  color: colors.background,
                  fontSize: dimensions.fontSizeSubTitle,
                }}
              >
                {recipe.name}, se guardó en tu lista de recetas.
              </Text>
            );
          })
          .finally(() => setIsLoadingMutation(false));
      })
      .catch(() => setIsLoadingMutation(false));
  };

  const handleNotificationOnRemoveMarked = () => {
    setIsLoadingMutation(true);
    AuthServices.getCurrentAuthUser()
      .getIdToken()
      .then((idToken) => {
        triggerDeleteMarkedRecipe({
          id: recipeId,
          idToken,
        })
          .then(() => {
            goNotification(
              <Text
                style={{
                  color: colors.background,
                  fontSize: dimensions.fontSizeSubTitle,
                }}
              >
                {recipe.name}, se eliminó de tu lista de recetas.
              </Text>
            );
          })
          .finally(() => setIsLoadingMutation(false));
      })
      .catch(() => setIsLoadingMutation(false));
  };

  return (
    <Pressable
      disabled={isLoadingMutation}
      style={[
        style,
        {
          alignItems: "center",
          justifyContent: "center",
        },
      ]}
      onPress={() => {
        isMarked
          ? handleNotificationOnRemoveMarked()
          : handleNotificationOnMarked();
      }}
    >
      <AnimatedFadeSwitchComponent
        toggle={isMarked}
        firstComponent={
          <MaterialCommunityIcons
            name="bookmark-minus-outline"
            size={dimensions.iconSize}
            color={colors.primary}
          />
        }
        secondComponent={
          <MaterialCommunityIcons
            name="bookmark-minus"
            size={dimensions.iconSize}
            color={colors.primary}
          />
        }
      />
    </Pressable>
  );
};

BookMarkButtonUserAction.propTypes = {
  style: PropTypes.object,
  recipe: PropTypes.object.isRequired,
};

BookMarkButton.propTypes = {
  style: PropTypes.object,
  recipe: PropTypes.object.isRequired,
};

export default BookMarkButton;
