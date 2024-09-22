import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { View } from "react-native";

import AppRoot from "./src/screens/root/AppRoot";
import Welcome from "./src/screens/welcome/Welcome";
import Authentication from "./src/screens/authentication/Authentication";
import Recipe from "./src/screens/recipe/Recipe";
import CreateRecipe from "./src/screens/create/CreateRecipe";
import EditProfile from "./src/screens/edit/EditProfile";

import LocalStorageServices from "./src/services/LocalStorageServices";
import AuthServices from "./src/services/AuthServices";

import moment from "moment";
import "moment/locale/es";
moment.locale("es");

import { colors } from "./src/themes/colors";

import { useFonts } from "expo-font";
import fonts from "./src/global/fonts";

import { Provider, useDispatch, useSelector } from "react-redux";
import { setUser } from "./src/features/auth/authSlice";
import store from "./src/store/store";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </Provider>
  );
}

const StackNavigator = () => {
  const dispatch = useDispatch();
  const { authUser } = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(true);
  const [isFirstTime, setIsFirstTime] = useState(true);
  const [fontsLoaded] = useFonts(fonts);

  useEffect(() => {
    LocalStorageServices.getItem({
      key: "@MikuyUserActivity/firstTime",
      onSuccess: (item) => {
        setIsFirstTime(item === "true");
      },
      onFinally: () => setIsLoading(false),
    });
  }, []);

  useEffect(() => {
    AuthServices.onAuthStateReady((authUser) => dispatch(setUser(authUser)));
  }, []);

  if (isLoading || !fontsLoaded) {
    return <View style={{ flex: 1, backgroundColor: colors.background }} />;
  }

  return (
    <Stack.Navigator
      initialRouteName={isFirstTime ? "welcome" : "root"}
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: colors.background,
        },
      }}
    >
      {isFirstTime && !authUser && (
        <Stack.Screen name="welcome" component={Welcome} />
      )}
      {!authUser && (
        <Stack.Screen name="authentication" component={Authentication} />
      )}
      {authUser && (
        <>
          <Stack.Screen name="create" component={CreateRecipe} />
          <Stack.Screen name="edit" component={EditProfile} />
        </>
      )}
      <Stack.Screen name="root" component={AppRoot} />
      <Stack.Screen name="recipe" component={Recipe} />
    </Stack.Navigator>
  );
};
