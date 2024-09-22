import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import React, { useRef, useState } from "react";
import { colors } from "../../themes/colors";
import { dimensions } from "../../utils/dimensions";
import AnimatedFadeMountView from "../../components/animated/AnimatedFadeMountView";
import PagerView from "react-native-pager-view";
import AnimatedTranslateMountView from "../../components/animated/AnimatedTranslateMountView";
import NextButton from "../../components/NextButton";
import { images } from "../../utils/images";
import AnimatedExpandableView from "../../components/animated/AnimatedExpandableView";
import AnimatedFadeSwitchComponent from "../../components/animated/AnimatedFadeSwitchComponent";
import { useDispatch } from "react-redux";
import { setUser } from "../../features/auth/authSlice";
import AuthServices from "../../services/AuthServices"

const SignUpCarousel = () => {
  const pager = useRef(null);
  const [currentPage, setCurrentPage] = useState(0);
  const dispatch = useDispatch();

  const onPageSelected = (event) => {
    setCurrentPage(event.nativeEvent.position);
  };

  return (
    <AnimatedFadeMountView style={styles.signUpCarousel}>
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
              style={{
                height: 150,
                width: 150,
              }}
              source={require("../../../assets/images/check.png")}
            />
            <Text style={styles.title}>!REGISTRO{"\n"}EXITOSO!</Text>
            <Text style={styles.subTitle}>
              Nos alegra que te unas a nuestra comunidad de amantes de la
              cocina!
            </Text>
          </View>
          <View style={styles.page} key="2">
            <Image
              style={{
                height: 300,
                width: 300,
              }}
              source={require("../../../assets/images/sign_up.png")}
            />
            <Text style={styles.title}>
              ¡LISTO{"\n"}PARA{"\n"}COCINAR!
            </Text>
            <Text style={styles.subTitle}>
              Tu próxima comida espectacular está a solo un toque de distancia.
            </Text>
          </View>
        </PagerView>

        <AnimatedTranslateMountView
          delay={1000}
          startPosition={[dimensions.layoutHorizontalPadding, 0]}
        >
          <NextButton
            onPress={() => {
              if (currentPage == 1) {
                dispatch(setUser(AuthServices.getSerializedCurrentUser()));
              } else {
                pager.current.setPage(currentPage + 1);
              }
            }}
          >
            <AnimatedExpandableView
              style={{ overflow: "hidden" }}
              visibility={currentPage == 1}
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
  signUpCarousel: {
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
  title: {
    color: colors.primary,
    fontSize: dimensions.fontSizeBig,
    fontWeight: "bold",
    textAlign: "center",
  },
  subTitle: {
    color: colors.onBackground,
    fontSize: dimensions.fontSizeSubTitle,
    fontWeight: "regular",
    textAlign: "center",
  },
});

export default SignUpCarousel;
