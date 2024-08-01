import {
  StyleSheet,
  View,
  Text,
  Image,
  Pressable,
  TextInput,
  StatusBar,
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
import moment from "moment";

//FIXME: In Config file
import "moment/locale/es";
moment.locale("es");

const AppBar = ({ isAtTop }) => {
  return (
    <View style={styles.appBar}>
      <AppBarHeader />
      <FlexibleSpace isAtTop={isAtTop} />
      <SearchInput />
    </View>
  );
};

AppBar.propTypes = {
  isAtTop: PropTypes.bool.isRequired,
};

const AppBarHeader = () => {
  function handleModal(event) {
    console.log("modal");
  }

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
          onPress={(_) =>
            routerController.navigateTo(routerController.routesName.profile)
          }
        >
          <Fontisto
            name="bell"
            size={dimensions.iconSize}
            color={colors.onPrimary}
          />
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

const FlexibleSpace = ({ isAtTop }) => {
  //FIXME: In user Config file
  const user = {
    name: "Mikuy",
  };

  const momentDate = moment();
  const momentFormat = momentDate.format("dddd D [de] MMMM [del] YYYY, h:mm a");

  return (
    <AnimatedExpandableView
      style={styles.flexibleSpace}
      visibility={isAtTop}
      minSize={[null, 0]}
      maxSize={[null, 150]}
    >
      <View style={{ height: 40 }}></View>
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
    </AnimatedExpandableView>
  );
};

FlexibleSpace.propTypes = {
  isAtTop: PropTypes.bool.isRequired,
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
    setInputValue("");
  }

  return (
    <View style={styles.searchInput}>
      <View style={styles.searchInputContent}>
        <View style={{ flexDirection: "row", gap: 20, alignItems: "center" }}>
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
        {inputValue == "" ? (
          <Pressable>
            <FontAwesome6
              name="sliders"
              size={dimensions.iconSize}
              color={colors.primary}
            />
          </Pressable>
        ) : (
          <Pressable onPress={cleanInput}>
            <AntDesign
              name="close"
              size={dimensions.iconSize}
              color={colors.primary}
            />
          </Pressable>
        )}
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
    paddingTop: StatusBar.currentHeight ? StatusBar.currentHeight + 10 : 40,
    paddingBottom: 20,
    paddingHorizontal: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
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
    gap: 20,
  },
  flexibleSpace: {
    justifyContent: "center",
  },
  flexibleSpaceHeader: {
    flexDirection: "row",
    gap: 20
  },
  userImage: {
    height: 70,
    width: 70,
    borderRadius: 80,
  },
  greetings: {
    justifyContent: "space-between",
  },
  title: {
    color: colors.onPrimary,
    fontSize: 18,
    fontWeight: "bold",
  },
  subtitle: {
    color: colors.onPrimary,
    fontSize: 14,
    fontWeight: "regular",
  },
  searchInput: {
    backgroundColor: colors.onPrimary,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    marginTop: 40,
    paddingHorizontal: 30,
    paddingVertical: 12,
  },
  searchInputContent: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  searchInputText: {
    fontSize: 14,
    color: colors.onSecondary,
    fontWeight: "regular",
  },
  recommendationList: {
    marginTop: 20,
    paddingHorizontal: 40,
  },
  recommendationItem: {
    paddingVertical: 5,
    fontSize: 14,
    color: colors.onSecondary,
    fontWeight: "regular",
  },
});
