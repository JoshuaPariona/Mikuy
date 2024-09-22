import { StyleSheet, Image, View, Text, Pressable } from "react-native";
import React, { useRef, useState } from "react";
import AnimatedFadeMountView from "../../components/animated/AnimatedFadeMountView";
import { images } from "../../utils/images";
import { colors } from "../../themes/colors";
import { dimensions } from "../../utils/dimensions";
import PagerView from "react-native-pager-view";
import AnimatedFadeSwitchComponent from "../../components/animated/AnimatedFadeSwitchComponent";
import AnimatedTranslateMountView from "../../components/animated/AnimatedTranslateMountView";
import AnimatedExpandableView from "../../components/animated/AnimatedExpandableView";
import PagerIndicator from "../../components/PagerIndicator";
import NextButton from "../../components/NextButton";
import { useNavigation } from "@react-navigation/native";
import LocalStorageServices from "../../services/LocalStorageServices";

const WelcomeCarousel = () => {
  const pager = useRef(null);
  const [currentPage, setCurrentPage] = useState(0);
  const navigation = useNavigation();

  const onPageSelected = (event) => {
    setCurrentPage(event.nativeEvent.position);
  };

  return (
    <AnimatedFadeMountView style={styles.welcomeCarousel}>
      <Image style={{ height: 50, width: 120 }} source={images.appLogoName} />
      <AnimatedFadeMountView style={{ width: "100%", flex: 1 }} delay={1000}>
        <PagerView
          ref={pager}
          style={{
            width: "100%",
            flex: 1,
          }}
          initialPage={0}
          overScrollMode="never"
          onPageSelected={onPageSelected}
        >
          <View style={styles.page} key="1">
            <Image
              style={styles.image}
              source={require("../../../assets/images/welcome1.png")}
            />
            <View style={{ height: 30 }}></View>
            <Text style={styles.title}>VARIEDAD DE RECETAS</Text>
            <Text style={styles.subTitle}>
              Explora una amplia gama de recetas para todas las comidas.
            </Text>
          </View>
          <View style={styles.page} key="2">
            <Image
              style={styles.image}
              source={require("../../../assets/images/welcome2.png")}
            />
            <View style={{ height: 30 }} />
            <Text style={styles.title}>FAVORITOS GUARDADOS</Text>
            <Text style={styles.subTitle}>
              Accede rápidamente a tus recetas preferidas.
            </Text>
          </View>
          <View style={styles.page} key="3">
            <Image
              style={styles.image}
              source={require("../../../assets/images/welcome3.png")}
            />
            <View style={{ height: 30 }} />
            <Text style={styles.title}>SUGERENCIA DE MENÚS</Text>
            <Text style={styles.subTitle}>
              Recibe ideas de menús completos para diferentes eventos.
            </Text>
          </View>
        </PagerView>

        <View
          style={[
            {
              position: "absolute",
              height: "100%",
              width: "100%",
              pointerEvents: "none",
            },
            styles.page,
          ]}
        >
          <View style={{ height: 300 }} />
          <PagerIndicator page={currentPage} />
          <View style={{ height: 80 }} />
        </View>
        <AnimatedTranslateMountView
          delay={1000}
          startPosition={[dimensions.layoutHorizontalPadding, 0]}
        >
          <NextButton
            onPress={() => {
              if (currentPage == 2) {
                LocalStorageServices.setItem({
                  key: "@MikuyUserActivity/firstTime",
                  value: false,
                });
                navigation.replace("authentication");
              } else {
                pager.current.setPage(currentPage + 1);
              }
            }}
          >
            <AnimatedExpandableView
              style={{ overflow: "hidden" }}
              visibility={currentPage == 2}
              minSize={[0, null]}
              maxSize={[80, null]}
            >
              <Text style={styles.forwardButtonLabel}> Comenzar </Text>
            </AnimatedExpandableView>
          </NextButton>
        </AnimatedTranslateMountView>

        <AnimatedFadeSwitchComponent
          style={styles.backButtonContainer}
          toggle={currentPage == 0}
          firstComponent={
            <Pressable
              style={styles.backButton}
              onPress={() => {
                pager.current.setPage(currentPage - 1);
              }}
            >
              <Text style={styles.backButtonLabel}>Volver</Text>
            </Pressable>
          }
          secondComponent={<></>}
        />
      </AnimatedFadeMountView>
    </AnimatedFadeMountView>
  );
};

const styles = StyleSheet.create({
  welcomeCarousel: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: "center",
    paddingHorizontal: dimensions.layoutHorizontalPadding,
    paddingVertical: dimensions.layoutVerticalPadding,
  },
  page: {
    justifyContent: "center",
    alignItems: "center",
    gap: dimensions.layoutVerticalGap,
  },
  forwardButtonLabel: {
    width: 80,
    color: colors.onPrimary,
    fontSize: dimensions.fontSizeSubTitle,
    fontWeight: "bold",
  },
  backButtonContainer: {
    position: "absolute",
    left: 0,
    bottom: dimensions.layoutVerticalPadding,
  },
  backButton: {
    height: 50,
    width: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  backButtonLabel: {
    color: colors.onTertiary,
    fontSize: dimensions.fontSizeSubTitle,
    fontWeight: "regular",
  },
  image: {
    height: 300,
    width: 300,
  },
  title: {
    color: colors.primary,
    fontSize: dimensions.fontSizeTitle,
    fontWeight: "bold",
  },
  subTitle: {
    color: colors.onBackground,
    fontSize: dimensions.fontSizeSubTitle,
    fontWeight: "regular",
  },
});

export default WelcomeCarousel;
