import {
  StyleSheet,
  View,
  Text,
  Image,
  Pressable,
  TextInput,
  ScrollView,
  Keyboard,
} from "react-native";

import Fontisto from "@expo/vector-icons/Fontisto";
import Entypo from "@expo/vector-icons/Entypo";
import { AntDesign } from "@expo/vector-icons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import React, { useState } from "react";
import PropTypes from "prop-types";

import routerController from "../controllers/RouterController.js";
import { colors } from "../themes/colors";
import { dimensions } from "../utils/dimensions";

import AnimatedExpandableView from "./animated/AnimatedExpandableView.js";
import AnimatedRotateSwitchComponent from "./animated/AnimatedRotateSwitchComponent.js";
import AnimatedExpandableStepView from "./animated/AnimatedExpandableStepView.js";
import AnimatedSwingView from "./animated/AnimatedSwingView.js";

import moment from "moment";

//FIXME: In Config file
import "moment/locale/es";
moment.locale("es");

const AppBar = ({ animScrollOffsetY }) => {
  return (
    <View style={styles.appBar}>
      <AppBarHeader />
      <FlexibleSpace animScrollOffsetY={animScrollOffsetY} />
      <SearchInput />
    </View>
  );
};

AppBar.propTypes = {
  animScrollOffsetY: PropTypes.any.isRequired,
};

const AppBarHeader = () => {
  function handleModal(event) {
    console.log("modal");
  }
  const [pressed, setPressed] = useState(false);

  return (
    <View style={styles.appBarHeader}>
      <View style={styles.appBarHeaderLogo}>
        <Image
          style={styles.appBarHeaderLogo}
          source={require("../../assets/images/mikuy_logo.png")}
        />
      </View>
      <View style={styles.appBarHeaderActions}>
        <Pressable
          onPress={(_) => {
            setPressed(!pressed);
            routerController.navigateTo(routerController.routesName.profile);
          }}
        >
          <AnimatedSwingView state={pressed}>
            <Fontisto
              name="bell"
              size={dimensions.iconSize}
              color={colors.onPrimary}
            />
          </AnimatedSwingView>
        </Pressable>
        <Pressable onPress={handleModal}>
          <Entypo
            name="dots-three-vertical"
            size={dimensions.iconSize}
            color={colors.onPrimary}
          />
        </Pressable>
      </View>
    </View>
  );
};

const FlexibleSpace = ({ animScrollOffsetY }) => {
  //FIXME: In user Config file
  const user = {
    name: "Mikuy",
  };

  const momentDate = moment();
  const momentFormat = momentDate.format("dddd D [de] MMMM [del] YYYY, h:mm a");

  /**/
  return (
    <AnimatedExpandableStepView
      step={animScrollOffsetY}
      minSize={[null, 0]}
      maxSize={[null, 150]}
    >
      <View style={{ height: dimensions.layoutVerticalGap }}></View>
      <View style={styles.flexibleSpaceHeader}>
        <Image
          style={styles.userImage}
          source={require("../../assets/images/mikuy_user_img.png")}
        />
        <View style={styles.greetings}>
          <Text style={styles.title}>Hola, {user.name}!</Text>
          <Text style={styles.subtitle}>
            {momentFormat.charAt(0).toUpperCase() + momentFormat.slice(1)}
          </Text>
          <Text style={styles.subtitle}>
            Preparemos una cena para la familia!
          </Text>
        </View>
      </View>
    </AnimatedExpandableStepView>
  );
};

FlexibleSpace.propTypes = {
  animScrollOffsetY: PropTypes.any.isRequired,
};

const SearchInput = () => {
  const [recommendVisibility, setRecommendVisibility] = useState(false);
  const [inputValue, setInputValue] = useState("");

  function onSelectedItem(item) {
    setRecommendVisibility(false);
    setInputValue(item.name);
    Keyboard.dismiss();
  }

  function cleanInput() {
    console.log("clean");
    setInputValue("");
  }

  function filter() {
    console.log("filter");
  }

  function handleActionPress() {
    if (inputValue != "") {
      cleanInput();
    } else {
      filter();
    }
  }

  return (
    <View style={styles.searchInput}>
      <View style={styles.searchInputContent}>
        <View
          style={{
            flexDirection: "row",
            gap: dimensions.layoutHorizontalGap,
            alignItems: "center",
          }}
        >
          <Pressable>
            <FontAwesome
              name="search"
              size={dimensions.iconSize}
              color={colors.primary}
            />
          </Pressable>
          <TextInput
            style={styles.searchInputText}
            cursorColor={colors.primary}
            placeholder="¿Qué prepararemos hoy?"
            value={inputValue}
            onChangeText={(text) => setInputValue(text)}
            onFocus={() => setRecommendVisibility(true)}
            onBlur={() => setRecommendVisibility(false)}
          />
        </View>
        <Pressable onPress={handleActionPress}>
          <AnimatedRotateSwitchComponent
            toggle={inputValue != ""}
            componentBaseSize="first"
            firstComponent={
              <FontAwesome6
                name="sliders"
                size={dimensions.iconSize}
                color={colors.primary}
              />
            }
            secondComponent={
              <AntDesign
                name="close"
                size={dimensions.iconSize}
                color={colors.primary}
              />
            }
          />
        </Pressable>
      </View>
      <AnimatedExpandableView
        visibility={recommendVisibility}
        minSize={[null, 0]}
        maxSize={[null, 150]}
      >
        <RecommendationList onSelectedItem={onSelectedItem} />
      </AnimatedExpandableView>
    </View>
  );
};

const RecommendationList = ({ onSelectedItem }) => {
  const recommendation = [
    { id: 1, name: "Saltado de Pollo" },
    { id: 2, name: "Choripan" },
    { id: 3, name: "Ensalada de frutas" },
    { id: 4, name: "Pizza de carne" },
    { id: 5, name: "Saltado de Pollo" },
    { id: 6, name: "Choripan" },
    { id: 7, name: "Ensalada de frutas" },
    { id: 8, name: "Pizza de carne" },
  ];

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      overScrollMode="never"
      keyboardShouldPersistTaps="handled"
      style={styles.recommendationList}
    >
      {recommendation.map((item) => (
        <Pressable key={item.id} onPress={() => onSelectedItem(item)}>
          <Text style={styles.recommendationItem}>{item.name}</Text>
          <View
            style={{
              borderBottomColor: colors.primary,
              borderBottomWidth: 1,
            }}
          />
        </Pressable>
      ))}
    </ScrollView>
  );
};

RecommendationList.propTypes = {
  onSelectedItem: PropTypes.func.isRequired,
};

export default AppBar;

const styles = StyleSheet.create({
  appBar: {
    position: "absolute",
    width: "100%",
    zIndex: 2,
    paddingTop: dimensions.statusbar,
    paddingBottom: dimensions.layoutVerticalPadding,
    paddingHorizontal: dimensions.layoutHorizontalPadding,
    borderBottomLeftRadius: dimensions.layoutBorderRadius,
    borderBottomRightRadius: dimensions.layoutBorderRadius,
    backgroundColor: colors.primary,
  },
  appBarHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  appBarHeaderLogo: {
    objectFit: "cover",
    width: 82,
    height: 54,
  },
  appBarHeaderActions: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: dimensions.layoutHorizontalGap,
  },
  flexibleSpace: {
    justifyContent: "center",
  },
  flexibleSpaceHeader: {
    flexDirection: "row",
    gap: dimensions.layoutHorizontalGap,
  },
  userImage: {
    height: dimensions.circleAvatarSizeLarge,
    width: dimensions.circleAvatarSizeLarge,
    borderRadius: dimensions.circleAvatarSizeLarge,
  },
  greetings: {
    justifyContent: "space-between",
  },
  title: {
    color: colors.onPrimary,
    fontSize: dimensions.fontSizeTitle,
    fontWeight: "bold",
  },
  subtitle: {
    color: colors.onPrimary,
    fontSize: dimensions.fontSizeSubTitle,
    fontWeight: "regular",
  },
  searchInput: {
    backgroundColor: colors.secondary,
    borderTopLeftRadius: dimensions.layoutBorderRadius,
    borderTopRightRadius: dimensions.layoutBorderRadius,
    borderBottomLeftRadius: dimensions.layoutBorderRadius,
    borderBottomRightRadius: dimensions.layoutBorderRadius,
    marginTop: dimensions.layoutVerticalGap,
    paddingHorizontal: dimensions.layoutHorizontalPadding,
    paddingVertical: 12,
  },
  searchInputContent: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  searchInputText: {
    fontSize: dimensions.fontSizeSubTitle,
    color: colors.onSecondary,
    fontWeight: "regular",
  },
  recommendationList: {
    marginTop: dimensions.layoutVerticalPadding,
    paddingHorizontal: 40,
  },
  recommendationItem: {
    paddingVertical: 5,
    fontSize: dimensions.fontSizeSubTitle,
    color: colors.onSecondary,
    fontWeight: "regular",
  },
});
