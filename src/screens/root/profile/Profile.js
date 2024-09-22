import { StyleSheet, ScrollView, View, Pressable, Text } from "react-native";
import React, { useContext, useState } from "react";
import BannerSection from "./sections/BannerSection";
import { dimensions } from "../../../utils/dimensions";
import DetailSection from "./sections/DetailSection";
import { colors } from "../../../themes/colors";
import InfoSection from "./sections/InfoSection";
import RecipesSection from "./sections/RecipesSection";
import { useDispatch, useSelector } from "react-redux";
import PrincipalButtonView from "../../../components/PrincipalButtonView";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import NoUser from "../components/NoUser";
import AuthServices from "../../../services/AuthServices";
import { setUser } from "../../../features/auth/authSlice";
import { useNavigation } from "@react-navigation/native";
import { BottomSheetContext } from "../../../context/BottomSheetProvider";
import LogOutModal from "../../../components/LogOutModal";
import ComingSoonModal from "../../../components/ComingSoonModal";

const pages = [
  <InfoSection key={0} />,
  <RecipesSection key={1} />,
  <ComingSoonModal  key={2}/>,
];

const Profile = () => {
  const { setSheetContent, openBottomSheet, closeBottomSheet } =
    useContext(BottomSheetContext);
  const { authUser } = useSelector((state) => state.auth);
  const [page, setPage] = useState(0);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleLogOut = () => {
    setSheetContent(
      <LogOutModal
        onConfirm={() => {
          AuthServices.signOut({
            onSuccess: () => dispatch(setUser(null)),
          });
          closeBottomSheet();
        }}
        onDismiss={closeBottomSheet}
      />
    );
    openBottomSheet();
  };

  return authUser ? (
    <ScrollView
      style={{ flex: 1 }}
      keyboardDismissMode="on-drag"
      overScrollMode="never"
      showsVerticalScrollIndicator={false}
    >
      <BannerSection />
      <View style={styles.layout}>
        <DetailSection />
        <View style={styles.row}>
          <PrincipalButtonView
            style={styles.editButton}
            onPress={() => {
              navigation.navigate("edit");
            }}
          >
            <AntDesign
              name="edit"
              size={dimensions.iconSize}
              color={colors.onPrimary}
            />
            <Text style={styles.editButtonLabel}>Editar Perfil</Text>
          </PrincipalButtonView>
          <PrincipalButtonView style={styles.editButton} onPress={handleLogOut}>
            <Entypo
              name="log-out"
              size={dimensions.iconSize}
              color={colors.onPrimary}
            />
            <Text style={styles.editButtonLabel}>Cerrar sesión</Text>
          </PrincipalButtonView>
        </View>
        <PageToggler page={page} setPage={setPage} />
        {pages[page]}
      </View>
    </ScrollView>
  ) : (
    <NoUser />
  );
};

const PageToggler = ({ page, setPage }) => {
  return (
    <View style={{ flexDirection: "row", gap: 20, justifyContent: "center" }}>
      <Pressable
        style={[
          styles.toggleButton,
          page === 0 ? styles.focusToggleButton : null,
        ]}
        onPress={() => setPage(0)}
      >
        <Text
          style={[
            styles.buttonLabel,
            page === 0 ? styles.focusButtonLabel : null,
          ]}
        >
          Información
        </Text>
      </Pressable>
      <Pressable
        style={[
          styles.toggleButton,
          page === 1 ? styles.focusToggleButton : null,
        ]}
        onPress={() => setPage(1)}
      >
        <Text
          style={[
            styles.buttonLabel,
            page === 1 ? styles.focusButtonLabel : null,
          ]}
        >
          Recetas
        </Text>
      </Pressable>
      <Pressable
        style={[
          styles.toggleButton,
          page === 2 ? styles.focusToggleButton : null,
        ]}
        onPress={() => setPage(2)}
      >
        <Text
          style={[
            styles.buttonLabel,
            page === 2 ? styles.focusButtonLabel : null,
          ]}
        >
          Siguiendo
        </Text>
      </Pressable>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  layout: {
    gap: dimensions.layoutVerticalGap,
    paddingHorizontal: dimensions.layoutHorizontalPadding,
    paddingVertical: dimensions.layoutVerticalPadding,
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    gap: dimensions.sectionHorizontalGap,
  },
  editButton: {
    flexDirection: "row",
    gap: dimensions.sectionHorizontalGap,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 15,
  },
  editButtonLabel: {
    fontFamily: "PoppinsBold",
    fontSize: dimensions.fontSizeSubTitle,
    color: colors.onPrimary,
  },
  toggleButton: {
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  focusToggleButton: {
    borderBottomWidth: 2,
    borderBottomColor: colors.primary,
  },
  buttonLabel: {
    fontFamily: "PoppinsBold",
    fontSize: dimensions.fontSizeSubTitle,
    color: colors.onTertiary,
  },
  focusButtonLabel: {
    color: colors.onBackground,
  },
});
