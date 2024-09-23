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
import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

import { colors } from "../../../themes/colors.js";
import { dimensions } from "../../../utils/dimensions.js";
import { images } from "../../../utils/images.js";

import AnimatedExpandableView from "../../../components/animated/AnimatedExpandableView.js";
import AnimatedRotateSwitchComponent from "../../../components/animated/AnimatedRotateSwitchComponent.js";
import AnimatedExpandableStepView from "../../../components/animated/AnimatedExpandableStepView.js";
import AnimatedSwingView from "../../../components/animated/AnimatedSwingView.js";

import moment from "moment";

import { useSelector } from "react-redux";
import { useGetCurrentUserQuery } from "../../../services/user.js";
import { BottomSheetContext } from "../../../context/BottomSheetProvider.js";
import ComingSoonModal from "../../../components/ComingSoonModal.js";
import { SearchInputContext } from "../../../context/SearchInputProvider.js";
import FilterModal from "../../../components/FilterModal.js";

const AppBar = ({ tabNavigator, pageIndex, tabs, scrollOffsetY }) => {
  const { authUser } = useSelector((state) => state.auth);
  const [inputVisibility, setInputVisibility] = useState(false);
  const [flexibleSpaceVisibility, setFlexibleSpaceVisibility] = useState(false);

  useEffect(() => {
    switch (tabs[pageIndex].appBarType) {
      case "all":
        setInputVisibility(true);
        setFlexibleSpaceVisibility(true);
        break;
      case "input":
        setInputVisibility(true);
        setFlexibleSpaceVisibility(false);
        break;
      default:
        setInputVisibility(false);
        setFlexibleSpaceVisibility(false);
        break;
    }
  }, [pageIndex]);

  return (
    <View style={styles.appBar}>
      <AppBarHeader tabNavigator={tabNavigator} />

      <AnimatedExpandableView
        visibility={flexibleSpaceVisibility}
        minSize={[null, 0]}
        maxSize={[null, 110]}
      >
        {authUser ? <FlexibleSpace scrollOffsetY={scrollOffsetY} /> : null}
      </AnimatedExpandableView>
      <AnimatedExpandableView
        visibility={inputVisibility}
        minSize={[null, 0]}
        maxSize={[null, 260]}
      >
        <SearchInput tabNavigator={tabNavigator} />
      </AnimatedExpandableView>
    </View>
  );
};

AppBar.propTypes = {
  pageIndex: PropTypes.number.isRequired,
  tabs: PropTypes.array.isRequired,
  tabNavigator: PropTypes.any,
  scrollOffsetY: PropTypes.any,
};

const AppBarHeader = ({ tabNavigator }) => {
  const { setSheetContent, openBottomSheet } = useContext(BottomSheetContext);
  const [pressed, setPressed] = useState(false);

  const handleNotification = () => {
    //AsyncStorage.clear();
    //tabNavigator.slideTo("profile");
    setPressed(!pressed);
    setSheetContent(
      <ComingSoonModal
        title={"Las notificaciones estarán disponibles pronto. 😅"}
      />
    );
    openBottomSheet();
  };

  const handleAppConfig = () => {
    setSheetContent(
      <ComingSoonModal
        title={"La configuración de la aplicación estará disponible pronto. 😅"}
      />
    );
    openBottomSheet();
  };

  return (
    <View style={styles.appBarHeader}>
      <Pressable
        style={styles.appBarHeaderLogo}
        onPress={() => tabNavigator.slideTo("home")}
      >
        <Image style={styles.appBarHeaderLogo} source={images.appLogoTitle} />
      </Pressable>
      <View style={styles.appBarHeaderActions}>
        <Pressable hitSlop={5} onPress={handleNotification}>
          <AnimatedSwingView state={pressed}>
            <Fontisto
              name="bell"
              size={dimensions.iconSize}
              color={colors.onPrimary}
            />
          </AnimatedSwingView>
        </Pressable>
        <Pressable hitSlop={5} onPress={handleAppConfig}>
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

const greetingMessage = (currentHour) => {
  if (currentHour >= 5 && currentHour < 11) {
    return "¡Preparemos el desayuno! 🌅";
  } else if (currentHour >= 11 && currentHour < 14) {
    return "Es hora del almuerzo.\n¡Buen provecho! 🍽️";
  } else if (currentHour >= 14 && currentHour < 18) {
    return "Un snack a esta hora?\nno estaría mal. 🍪";
  } else if (currentHour >= 18 && currentHour < 22) {
    return "¿Qué te parece preparar la cena? 🌙";
  } else if (currentHour >= 22 || currentHour < 1) {
    return "Es bastante tarde...\n¿un bocadillo nocturno? 🌜";
  } else if (currentHour >= 1 && currentHour < 5) {
    return "¡¿Aún despierto?! 🤯\n¿Preparando algo a medianoche?";
  }
};

const FlexibleSpace = ({ scrollOffsetY }) => {
  const { data: user, isLoading } = useGetCurrentUserQuery();

  const momentDate = moment();

  if (isLoading) return <View></View>;

  const source = user.image ? { uri: user.image } : images.userMikuy;

  return (
    <AnimatedExpandableStepView
      step={scrollOffsetY}
      range={350}
      minSize={[null, 0]}
      maxSize={[null, 90]}
    >
      <View style={{ height: dimensions.sectionVerticalGap }} />
      <View style={styles.flexibleSpaceHeader}>
        <Image style={styles.userImage} source={source} />
        <View style={styles.greetings}>
          <Text style={styles.title}>
            Hola, {user.name?.split(" ").slice(0, 2).join(" ")}!
          </Text>
          <Text style={styles.subtitle}>
            {greetingMessage(momentDate.hour())}
          </Text>
        </View>
      </View>
    </AnimatedExpandableStepView>
  );
};

FlexibleSpace.propTypes = {
  scrollOffsetY: PropTypes.any,
};

const SearchInput = ({ tabNavigator }) => {
  const [recommendVisibility, setRecommendVisibility] = useState(false);
  const { input, setInput } = useContext(SearchInputContext);
  const { setSheetContent, openBottomSheet } = useContext(BottomSheetContext);

  function onSelectedItem(item) {
    setRecommendVisibility(false);
    setInput(item);
    Keyboard.dismiss();
  }

  function cleanInput() {
    setInput("");
  }

  function filter() {
    tabNavigator.slideTo("cookbook");
    setSheetContent(<FilterModal key={"filter-modal"} />);
    openBottomSheet();
  }

  function handleActionPress() {
    if (input != "") {
      cleanInput();
    } else {
      filter();
    }
  }

  return (
    <View style={styles.searchInput}>
      <View style={{ justifyContent: "center" }}>
        <TextInput
          style={styles.searchInputInput}
          cursorColor={colors.primary}
          placeholder="¿Qué prepararemos hoy?"
          value={input}
          onChangeText={(text) => setInput(text)}
          onFocus={() => {
            tabNavigator.slideTo("cookbook");
            setRecommendVisibility(true);
          }}
          onBlur={() => setRecommendVisibility(false)}
        />
        <Pressable
          style={{
            position: "absolute",
            left: dimensions.layoutHorizontalPadding,
          }}
        >
          <FontAwesome
            name="search"
            size={dimensions.iconSize}
            color={colors.primary}
          />
        </Pressable>
        <Pressable
          style={{
            position: "absolute",
            right: dimensions.layoutHorizontalPadding,
          }}
          hitSlop={5}
          onPress={handleActionPress}
        >
          <AnimatedRotateSwitchComponent
            toggle={input != ""}
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
    "Tacos de pollo",
    "Pastel de chocolate",
    "Pollo a la brasa",
    "Arroz chaufa",
    "Agua de maracuyá",
    "Alitas acevichadas",
    "Ensalada rusa"
  ];

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      overScrollMode="never"
      keyboardShouldPersistTaps="handled"
      style={styles.recommendationList}
    >
      {recommendation.map((item, index) => (
        <Pressable
          key={`item-${index * 1}`}
          onPress={() => onSelectedItem(item)}
        >
          <Text style={styles.recommendationItem}>{item}</Text>
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
    width: "100%",
    paddingVertical: dimensions.layoutVerticalPadding,
    paddingHorizontal: dimensions.layoutHorizontalPadding,
    borderBottomLeftRadius: dimensions.layoutBorderRadius,
    borderBottomRightRadius: dimensions.layoutBorderRadius,
    backgroundColor: colors.primary,
  },
  appBarHeader: {
    alignItems: "flex-end",
    height: dimensions.iconSize,
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
    fontFamily: "PoppinsBold",
    color: colors.onPrimary,
    fontSize: dimensions.fontSizeTitle,
  },
  subtitle: {
    fontFamily: "PoppinsRegular",
    color: colors.onPrimary,
    fontSize: dimensions.fontSizeSubTitle,
  },
  searchInput: {
    backgroundColor: colors.secondary,
    borderRadius: 20,
    marginTop: dimensions.sectionVerticalGap, // to gap of parent
  },
  searchInputInput: {
    fontFamily: "PoppinsRegular",
    fontSize: dimensions.fontSizeSubTitle,
    color: colors.onSecondary,
    paddingLeft:
      dimensions.layoutHorizontalPadding +
      dimensions.iconSize +
      dimensions.layoutHorizontalGap,
    paddingRight:
      dimensions.layoutHorizontalPadding +
      dimensions.iconSize +
      dimensions.layoutHorizontalGap,
    borderRadius: 20,
    paddingVertical: 12,
  },
  recommendationList: {
    marginVertical: dimensions.sectionVerticalPadding,
    paddingHorizontal: 40,
  },
  recommendationItem: {
    paddingVertical: 5,
    fontSize: dimensions.fontSizeSubTitle,
    color: colors.onSecondary,
    fontWeight: "regular",
  },
});
