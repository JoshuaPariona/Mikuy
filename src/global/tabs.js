import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";
import Foundation from "@expo/vector-icons/Foundation";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import moment from "moment";
import { colors } from "../themes/colors";
import { dimensions } from "../utils/dimensions";
import { Text, View } from "react-native";
const day = moment().format("DD");

const tabs = [
  {
    routeName: "cookbook",
    name: "Recetario",
    appBarType: "input",
    icon: (
      <FontAwesome
        name={"book"}
        size={dimensions.iconSize}
        color={colors.onPrimary}
      />
    ),
  },
  {
    routeName: "calendar",
    name: "Horario",
    appBarType: "none",
    icon: (
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Ionicons
          name={"calendar-clear"}
          size={dimensions.iconSize}
          color={colors.onPrimary}
        />
        <Text
          style={{
            paddingTop: 5,
            position: "absolute",
            fontSize: 14,
            fontWeight: "bold",
            color: colors.primary,
          }}
        >
          {day}
        </Text>
      </View>
    ),
  },
  {
    routeName: "home",
    name: "Inicio",
    appBarType: "all",
    icon: (
      <Foundation
        name={"home"}
        size={dimensions.iconSize}
        color={colors.onPrimary}
      />
    ),
  },
  {
    routeName: "bookmarks",
    name: "Lista",
    appBarType: "none",
    icon: (
      <MaterialCommunityIcons
        name={"bookmark-minus"}
        size={dimensions.iconSize}
        color={colors.onPrimary}
      />
    ),
  },
  {
    routeName: "profile",
    name: "Perfil",
    appBarType: "none",
    icon: <FontAwesome5 name={"user-alt"} size={20} color={colors.onPrimary} />,
  },
];

export default tabs;