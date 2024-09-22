import {
  StyleSheet,
  Image,
  Platform,
  StatusBar,
  ScrollView,
  View,
  Animated,
  Pressable,
  Text,
  Modal,
  TouchableHighlight,
} from "react-native";
import React, { useContext, useRef, useState } from "react";
import AnimatedFadeMountView from "../../components/animated/AnimatedFadeMountView";
import BookMarkButton from "../../components/BookMarkButton";
import PopButton from "../../components/PopButton";
import PropTypes from "prop-types";
import { colors } from "../../themes/colors";
import { dimensions } from "../../utils/dimensions";
import ImagesModal from "../../components/ImagesModal";
import AnimatedExpandableStepView from "../../components/animated/AnimatedExpandableStepView";
import TitleSection from "./sections/TitleSection";
import MainDetailsSection from "./sections/MainDetailsSection";
import AuthorSection from "./sections/AuthorSection";
import DetailsSection from "./sections/DetailsSection";
import ReviewsSection from "./sections/ReviewsSection";
import BottomSheet from "../../components/BottomSheet";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useGetRecipeByIdQuery } from "../../services/recipe";
import NotifierProvider from "../../context/NotifierProvider";
import BottomSheetProvider, {
  BottomSheetContext,
} from "../../context/BottomSheetProvider";
import Notifier from "./components/Notifier";

const Recipe = ({ route }) => {
  const { id } = route.params;
  const scrollOffsetY = useRef(new Animated.Value(0)).current;
  const [togglePage, setTogglePage] = useState(false);
  const [imageModalVisible, setImageModalVisible] = useState(false);

  const { data: recipe, isLoading } = useGetRecipeByIdQuery(id);

  if (isLoading) {
    return <View />;
  }

  return (
    <AnimatedFadeMountView delay={250} style={styles.recipe}>
      <NotifierProvider>
        <BottomSheetProvider>
          <AnimatedExpandableStepView
            step={scrollOffsetY}
            withOpacity={false}
            range={450}
            minSize={[null, 0]}
            maxSize={[null, 270]}
          >
            <View>
              <TouchableHighlight
                underlayColor={colors.background}
                activeOpacity={0.85}
                onPress={() => setImageModalVisible(true)}
              >
                <Image
                  style={styles.banner}
                  source={{ uri: recipe.thumbnail }}
                />
              </TouchableHighlight>
              <View style={styles.openImages}>
                <Ionicons
                  name="open-outline"
                  size={dimensions.iconSize}
                  color={colors.primary}
                />
              </View>
              <BookMarkButton
                style={styles.bookMarkButton}
                recipeId={id}
                recipe={recipe}
              />
            </View>
            <PopButton style={styles.popButton} />
          </AnimatedExpandableStepView>
          <TitleSection recipe={recipe} scrollOffsetY={scrollOffsetY} />
          <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{ backgroundColor: colors.background }}
            keyboardDismissMode="on-drag"
            overScrollMode="never"
            showsVerticalScrollIndicator={false}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: scrollOffsetY } } }],
              { useNativeDriver: false }
            )}
            scrollEventThrottle={16}
          >
            <View style={styles.layout}>
              <MainDetailsSection recipe={recipe} />
              <AuthorSection authorId={recipe.authorId} />
              <PageToggler toggle={togglePage} setPage={setTogglePage} />
              {togglePage ? (
                <ReviewsSection recipeId={id} rating={recipe.rating} />
              ) : (
                <DetailsSection recipe={recipe} />
              )}
            </View>
          </ScrollView>
          <Modal
            animationType="fade"
            transparent={true}
            visible={imageModalVisible}
            statusBarTranslucent
            onRequestClose={() => {
              setImageModalVisible(false);
            }}
          >
            <ImagesModal
              images={[recipe.thumbnail, ...(recipe.images ?? [])]}
              setModalVisible={setImageModalVisible}
            />
          </Modal>
          <Notifier />
          <RecipeBottomSheet />
        </BottomSheetProvider>
      </NotifierProvider>
    </AnimatedFadeMountView>
  );
};

const RecipeBottomSheet = () => {
  const { bottomSheetRef, sheetContent } = useContext(BottomSheetContext);
  return <BottomSheet ref={bottomSheetRef}>{sheetContent}</BottomSheet>;
};

const PageToggler = ({ toggle, setPage }) => {
  return (
    <View style={{ flexDirection: "row", gap: 50, justifyContent: "center" }}>
      <Pressable
        style={[styles.toggleButton, toggle ? null : styles.focusToggleButton]}
        onPress={() => setPage(false)}
      >
        <Text
          style={[styles.buttonLabel, toggle ? null : styles.focusButtonLabel]}
        >
          Detalles
        </Text>
      </Pressable>
      <Pressable
        style={[styles.toggleButton, toggle ? styles.focusToggleButton : null]}
        onPress={() => setPage(true)}
      >
        <Text
          style={[styles.buttonLabel, toggle ? styles.focusButtonLabel : null]}
        >
          Opinones
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  recipe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  popButton: {
    position: "absolute",
    top:
      Platform.OS === "android"
        ? (StatusBar.currentHeight || 0) + dimensions.layoutVerticalPadding
        : dimensions.layoutVerticalPadding,
    left: dimensions.layoutHorizontalPadding,
  },
  bookMarkButton: {
    position: "absolute",
    top:
      Platform.OS === "android"
        ? (StatusBar.currentHeight || 0) + dimensions.layoutVerticalPadding
        : dimensions.layoutVerticalPadding,
    right: dimensions.layoutHorizontalPadding,
    height: 45,
    width: 45,
    borderRadius: 25,
    backgroundColor: colors.background,
  },
  banner: {
    width: "100%",
    height: 300,
  },
  layout: {
    paddingHorizontal: dimensions.layoutHorizontalPadding,
    paddingVertical: dimensions.layoutVerticalPadding,
    gap: dimensions.sectionVerticalGap,
  },
  toggleButton: {
    borderColor: colors.primary,
    borderWidth: 2,
    borderRadius: 30,
    paddingHorizontal: 30,
    paddingVertical: 5,
  },
  focusToggleButton: {
    backgroundColor: colors.primary,
  },
  buttonLabel: {
    fontFamily: "PoppinsBold",
    fontSize: dimensions.fontSizeSubTitle,
    color: colors.primary,
  },
  focusButtonLabel: {
    color: colors.onPrimary,
  },
  openImages: {
    position: "absolute",
    bottom: dimensions.layoutVerticalPadding + 30,
    right: dimensions.layoutHorizontalPadding,
    height: 45,
    width: 45,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.background,
  },
});

export default Recipe;
