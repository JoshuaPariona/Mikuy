import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { images } from "../../utils/images";
import AnimatedFadeMountView from "../../components/animated/AnimatedFadeMountView";
import AnimatedTranslateMountView from "../../components/animated/AnimatedTranslateMountView";
import { dimensions } from "../../utils/dimensions";
import NextButton from "../../components/NextButton";
import { useDispatch } from "react-redux";
import { setUser } from "../../features/auth/authSlice";
import AuthServices from "../../services/AuthServices";
import { useGetCurrentUserQuery } from "../../services/user";
import { colors } from "../../themes/colors";

const SignInCarousel = () => {
  const dispatch = useDispatch();
  const { data: user, isLoading } = useGetCurrentUserQuery();

  if (isLoading) return <View style={{ flex: 1 }} />;

  return (
    <AnimatedFadeMountView style={styles.signInCarousel}>
      <Image style={{ height: 50, width: 120 }} source={images.appLogoName} />
      <AnimatedFadeMountView style={{ width: "100%", flex: 1 }} delay={1000}>
        <View style={styles.page}>
          <Image
            style={{
              height: 300,
              width: 300,
            }}
            source={images.signIn}
          />
          <Text style={styles.title}>
            !Bienvenido de vuelta{"\n"} {user.name || "Mikuycito"}!
          </Text>
          <Text style={styles.subTitle}>
            "Cocinar es como el amor: debe hacerse con abandono o no hacerlo en
            absoluto." - Harriet Van Horne
          </Text>
        </View>
        <AnimatedTranslateMountView
          delay={1000}
          startPosition={[dimensions.layoutHorizontalPadding, 0]}
        >
          <NextButton
            onPress={() =>
              dispatch(setUser(AuthServices.getSerializedCurrentUser()))
            }
          >
            <Text style={styles.forwardButtonLabel}>Comenzar</Text>
          </NextButton>
        </AnimatedTranslateMountView>
      </AnimatedFadeMountView>
    </AnimatedFadeMountView>
  );
};

const styles = StyleSheet.create({
  signInCarousel: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: "center",
    paddingHorizontal: dimensions.layoutHorizontalPadding,
    paddingVertical: dimensions.layoutVerticalPadding,
  },
  page: {
    flex: 1,
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
  title: {
    color: colors.primary,
    fontSize: dimensions.fontSizeBig,
    fontWeight: "bold",
    textAlign: "left",
  },
  subTitle: {
    color: colors.onBackground,
    fontSize: dimensions.fontSizeSubTitle,
    fontWeight: "regular",
    textAlign: "left",
  },
});

export default SignInCarousel;
