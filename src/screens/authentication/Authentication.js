import {
  Animated,
  Easing,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState, useRef } from "react";
import Feather from "@expo/vector-icons/Feather";
import { dimensions } from "../../utils/dimensions";
import AnimatedFadeSwitchComponent from "../../components/animated/AnimatedFadeSwitchComponent";
import { colors } from "../../themes/colors";
import { useNavigation } from "@react-navigation/native";
import PrincipalButtonView from "../../components/PrincipalButtonView";
import BottomSheet from "../../components/BottomSheet";
import PropTypes from "prop-types";
import AuthServices from "../../services/AuthServices";
import AnimatedFadeMountView from "../../components/animated/AnimatedFadeMountView";
import SignUpCarousel from "./SignUpCarousel";
import SignInCarousel from "./SignInCarousel";
import {
  useLazyGetCurrentUserQuery,
  usePutUserMutation,
} from "../../services/user";

const serializedAuthUser = (authUser) => {
  if (!authUser) return null;
  return {
    uid: authUser.uid,
    displayName: authUser.displayName,
    email: authUser.email,
    photoUrl: authUser.photoUrl,
    phoneNumber: authUser.phoneNumber,
  };
};

const Authentication = () => {
  // ADD: Callback param on auth dismiss and auth complete
  const bottomSheetRef = useRef(null);
  const [errorMessage, setErrorMessage] = useState("");

  const [signUpPage, setSignUpPage] = useState(false);
  const [signInPage, setSignInPage] = useState(false);

  const pageOpacity = useRef(new Animated.Value(1)).current;

  const onAuthFailure = (message) => {
    setErrorMessage(message);
    bottomSheetRef.current.open();
  };

  const onSignUpSuccess = (_) => {
    Animated.timing(pageOpacity, {
      toValue: 0,
      duration: 250,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start(() => setSignUpPage(true));
  };

  const onSignInSuccess = (authUser) => {
    Animated.timing(pageOpacity, {
      toValue: 0,
      duration: 250,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start(() => setSignInPage(true));
  };

  if (signUpPage) return <SignUpCarousel />;

  if (signInPage) return <SignInCarousel />;

  return (
    <Animated.View style={{ flex: 1, opacity: pageOpacity }}>
      <AnimatedFadeMountView delay={250} style={styles.authentication}>
        <AuthBackground />
        <View style={styles.content}>
          <Form
            onSignUpFailure={onAuthFailure}
            onSignUpSuccess={onSignUpSuccess}
            onSignInFailure={onAuthFailure}
            onSignInSuccess={onSignInSuccess}
          />
          <AltForm />
        </View>
        <BottomSheet ref={bottomSheetRef}>
          <View style={styles.bottomSheetContent}>
            <Text style={styles.titleErrorMsm}>Ups, algo salio mal!!!</Text>
            <Image
              style={{ height: 150, width: 150 }}
              source={require("../../../assets/images/warning.png")}
            />
            <Text style={styles.errorMsm}>{errorMessage}</Text>
          </View>
        </BottomSheet>
      </AnimatedFadeMountView>
    </Animated.View>
  );
};

const AuthBackground = () => {
  return (
    <>
      <Image
        style={{ width: "120%", position: "absolute", top: 0 }}
        source={require("../../../assets/shapes/top_wave.png")}
      />
      <Image
        style={{
          height: 120,
          width: 120,
          position: "absolute",
          top: dimensions.layoutVerticalPadding,
        }}
        source={require("../../../assets/images/mikuy_logo.png")}
      />
      <Image
        style={{ width: "120%", position: "absolute", bottom: 0 }}
        source={require("../../../assets/shapes/bottom_wave.png")}
      />
    </>
  );
};

function generateUniqueNickName(displayName, uid) {
  const namePart = displayName
    ? displayName.split(" ")[0].toLowerCase()
    : "mikuycito";
  const uidPart = uid.slice(-5);
  return `${namePart}${uidPart}`;
}

const Form = ({
  onSignUpFailure,
  onSignUpSuccess,
  onSignInFailure,
  onSignInSuccess,
}) => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(true);

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(true);
  const [securePassword, setSecurePassword] = useState(true);

  const [disable, setDisable] = useState(false);

  const [triggerPutUser] = usePutUserMutation();
  const [triggerGetCurrentUser] = useLazyGetCurrentUserQuery();

  const handleSignUp = (authUser) => {
    authUser.getIdToken().then((idToken) => {
      triggerPutUser({
        uid: authUser.uid,
        idToken,
        user: {
          image: authUser.photoURL || "",
          name: authUser.displayName || "Mikuycito",
          nickname: generateUniqueNickName(authUser.displayName, authUser.uid),
          socialNet: {
            email: authUser.email,
          },
        },
      })
        .then(() => onSignUpSuccess())
        .catch(() => {
          //TODO: es posible q aunque no se cree la cuenta pero si haya auth, aun funcione la app?
          onSignUpFailure("Error al crear la cuenta");
        });
    });
  };

  const handleSignIn = (authUser) => {
    // refetchCurrentUser for re-login in App
    triggerGetCurrentUser().then(() => onSignInSuccess(authUser));
  };

  const validateEmail = (email) => {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    setEmailError(!regex.test(email));
    setEmail(email);
  };

  // Mínimo ocho caracteres, al menos una letra mayúscula,
  // una letra minúscula, un número y sin espacios en blanco
  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,100}$/;
    setPasswordError(!regex.test(password));
    setPassword(password);
  };

  return (
    <>
      <Text style={styles.title}>INICIAR SESIÓN</Text>
      <View />
      <View style={styles.inputBox}>
        <Text style={styles.inputLabel}>Correo electrónico:</Text>
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          cursorColor={colors.primary}
          value={email}
          onChangeText={(text) => validateEmail(text.trim())}
          placeholder="correo@electronico.com"
          style={[
            styles.input,
            { color: emailError ? colors.error : styles.input.color },
          ]}
        />
      </View>
      <View style={styles.inputBox}>
        <Text style={styles.inputLabel}>Contraseña</Text>
        <View style={{ justifyContent: "center" }}>
          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry={securePassword}
            cursorColor={colors.primary}
            value={password}
            onChangeText={(text) => validatePassword(text)}
            placeholder=".............. "
            style={[
              styles.input,
              { color: passwordError ? colors.error : styles.input.color },
            ]}
          />
          <Pressable
            style={{ padding: 5, position: "absolute", right: 20 }}
            onPress={() => setSecurePassword(!securePassword)}
          >
            <AnimatedFadeSwitchComponent
              toggle={securePassword}
              firstComponent={
                <Feather
                  name="eye-off"
                  size={dimensions.smallIconSize}
                  color={colors.onTertiary}
                />
              }
              secondComponent={
                <Feather
                  name="eye"
                  size={dimensions.smallIconSize}
                  color={colors.onTertiary}
                />
              }
            />
          </Pressable>
        </View>
      </View>
      <View style={styles.submitButtonsContainer}>
        <PrincipalButtonView
          style={styles.submitButton}
          onPress={() => {
            if (passwordError || emailError) {
              return;
            }
            if (disable) return;
            setDisable(true);
            AuthServices.signUpUserWithEmailAndPassword({
              email: email.trim(),
              password: password.trim(),
              onSignUp: handleSignUp,
              onError: onSignUpFailure,
              onFinally: () => setDisable(false),
            });
          }}
        >
          <Text style={styles.submitButtonLabel}>Registrarse</Text>
        </PrincipalButtonView>
        <PrincipalButtonView
          style={styles.submitButton}
          onPress={() => {
            if (passwordError || emailError) {
              return;
            }
            if (disable) return;
            setDisable(true);
            AuthServices.signInWithEmailAndPassword({
              email: email.trim(),
              password: password.trim(),
              onSignIn: handleSignIn,
              onError: onSignInFailure,
              onFinally: () => setDisable(false),
            });
          }}
        >
          <Text style={styles.submitButtonLabel}>Iniciar Sesión</Text>
        </PrincipalButtonView>
      </View>
    </>
  );
};

Form.propTypes = {
  onSignUpFailure: PropTypes.func,
  onSignUpSuccess: PropTypes.func,
  onSignInFailure: PropTypes.func,
  onSignInSuccess: PropTypes.func,
};

const AltForm = () => {
  const navigation = useNavigation();
  return (
    <>
      <Text style={styles.o}>o</Text>
      <Text style={styles.sign}>Inicia sesión con</Text>
      <View style={{ flexDirection: "row", gap: 40 }}>
        <Pressable>
          <Image
            style={{ height: 40, width: 40 }}
            source={require("../../../assets/icons/facebook.png")}
          />
        </Pressable>
        <Pressable>
          <Image
            style={{ height: 40, width: 40 }}
            source={require("../../../assets/icons/google.png")}
          />
        </Pressable>
      </View>
      <Text
        style={styles.other}
        onPress={() => {
          if (navigation.canGoBack()) {
            navigation.goBack();
          } else {
            navigation.replace("root");
          }
        }}
      >
        Registrarse en otro momento
      </Text>
    </>
  );
};

const styles = StyleSheet.create({
  authentication: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background,
  },
  content: {
    paddingTop: 80,
    gap: dimensions.sectionVerticalGap,
    alignItems: "center",
  },
  title: {
    color: colors.primary,
    fontSize: dimensions.fontSizeTitle,
    fontWeight: "bold",
    textShadowColor: colors.onPrimary,
    textShadowRadius: 5,
  },
  o: {
    color: colors.onTertiary,
    fontSize: dimensions.fontSizeTitle,
    fontWeight: "bold",
  },
  sign: {
    color: colors.onTertiary,
    fontSize: dimensions.fontSizeSubTitle,
    fontWeight: "medium",
  },
  other: {
    color: colors.primary,
    fontSize: dimensions.fontSizeSubTitle,
    fontWeight: "medium",
    textDecorationLine: "underline",
    padding: 5,
    textShadowColor: colors.onPrimary,
    textShadowRadius: 5,
  },
  inputBox: {
    gap: dimensions.subSectionVerticalGap,
    color: colors.secondary,
    width: 300,
  },
  inputLabel: {
    color: colors.onTertiary,
    fontSize: dimensions.fontSizeSubTitle,
    fontWeight: "medium",
  },
  input: {
    color: colors.onSecondary,
    fontSize: dimensions.fontSizeSubTitle,
    fontWeight: "medium",
    borderRadius: dimensions.sectionBorderRadius,
    borderColor: colors.onTertiary,
    borderWidth: 2,
    paddingHorizontal: dimensions.sectionHorizontalPadding,
    paddingVertical: 5,
  },
  submitButtonsContainer: {
    flexDirection: "row",
    width: 300,
    justifyContent: "space-between",
  },
  submitButtonContainer: {
    borderRadius: dimensions.layoutBorderRadius,
  },
  submitButton: {
    paddingHorizontal: dimensions.layoutHorizontalPadding,
    borderRadius: dimensions.layoutBorderRadius,
    paddingVertical: 15,
  },
  submitButtonLabel: {
    color: colors.onPrimary,
    fontSize: dimensions.fontSizeSubTitle,
    fontWeight: "bold",
  },
  bottomSheetContent: {
    width: "100%",
    paddingVertical: dimensions.layoutVerticalPadding,
    paddingHorizontal: dimensions.layoutHorizontalPadding,
    gap: 20,
    alignItems: "center",
  },
  titleErrorMsm: {
    color: colors.onSecondary,
    fontSize: dimensions.fontSizeTitle,
    fontWeight: "bold",
    textAlign: "center",
  },
  errorMsm: {
    color: colors.onTertiary,
    fontSize: dimensions.fontSizeSubTitle,
    fontWeight: "regular",
    textAlign: "center",
  },
});

export default Authentication;
