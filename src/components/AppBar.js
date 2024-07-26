import {
  StyleSheet,
  View,
  Text,
  Image,
  Pressable,
  TextInput,
  StatusBar,
  ScrollView,
} from "react-native";

import Fontisto from "@expo/vector-icons/Fontisto";
import Entypo from "@expo/vector-icons/Entypo";
import { SimpleLineIcons, Ionicons, AntDesign } from "@expo/vector-icons";
import React, { useState } from "react";

import routerController from "../controllers/RouterController.js";
import { colors } from "../themes/colors";
import { dimensions } from "../utils/dimensions";

import moment from "moment";

//FIXME: In Config file
import "moment/locale/es";
moment.locale("es");

const AppBar = () => {
  return (
    <View style={styles.appBar}>
      <AppBarHeader />
      <FlexibleSpace />
    </View>
  );
};

const AppBarHeader = () => {
  function handleModal(event) {
    console.log("modal");
  }

  return (
    <View style={styles.appBarHeader}>
      <Image
        style={styles.appBarHeaderLogo}
        source={require("../../assets/images/mikuy_logo.png")}
      />
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

const FlexibleSpace = () => {
  //FIXME: In user Config file
  const user = {
    name: "Mikuy",
  };

  const momentDate = moment().format("dddd D [de] MMMM [del] YYYY, h:mm a");

  return (
    <View style={styles.flexibleSpace}>
      <View style={styles.flexibleSpaceHeader}>
        <Image
          style={styles.userImage}
          source={require("../../assets/images/mikuy_user_img.png")}
        />
        <View style={styles.greetings}>
          <Text style={styles.title}>Hola, {user.name}!</Text>
          <Text style={styles.subtitle}>
            {momentDate.charAt(0).toUpperCase() + momentDate.slice(1)}
          </Text>
          <Text style={styles.subtitle}>
            Preparemos una cena para la familia!
          </Text>
        </View>
      </View>
      <SearchInput />
    </View>
  );
};

const SearchInput = () => {
  const [recommendVisibility, setRecommendVisibility] = useState(false);
  const [inputValue, setInputValue] = useState("");

  function onSelectedItem(item) {
    setRecommendVisibility(false);
    setInputValue(item.name);
  }

  function cleanInput() {
    setInputValue("");
  }

  return (
    <View style={styles.searchInput}>
      <View style={styles.searchInputContent}>
        <View style={{ flexDirection: "row", gap: 20, alignItems: "center" }}>
          <Pressable>
            <SimpleLineIcons
              name="magnifier"
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
          />
        </View>
        {inputValue == "" ? (
          <Pressable>
            <Ionicons
              name="filter"
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
      {recommendVisibility ? (
        <RecommendationList onSelectedItem={onSelectedItem} />
      ) : null}
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
    <View style={styles.recommendationList}>
      <ScrollView
        style={{ paddingHorizontal: 40 }}
        showsVerticalScrollIndicator={false}
        keyboardDismissMode="on-drag"
        overScrollMode="never"
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
    </View>
  );
};

export default AppBar;

const styles = StyleSheet.create({
  appBar: {
    paddingTop: StatusBar.currentHeight ? StatusBar.currentHeight + 10 : 40,
    paddingBottom: 20,
    paddingHorizontal: 30,
    gap: 40,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    backgroundColor: colors.primary,
  },
  appBarHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  appBarHeaderLogo: {
    width: 82,
    aspectRatio: 82 / 54,
  },
  appBarHeaderActions: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 20,
  },
  flexibleSpace: {
    gap: 40,
  },
  flexibleSpaceHeader: {
    flexDirection: "row",
    gap: 20,
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
    paddingVertical: 10,
    height: 100,
  },
  recommendationItem: {
    paddingVertical: 5,
    fontSize: 14,
    color: colors.onSecondary,
    fontWeight: "regular",
  },
});
