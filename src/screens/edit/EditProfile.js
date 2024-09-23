import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Modal,
} from "react-native";
import React, { useContext, useState } from "react";
import {
  useGetCurrentUserQuery,
  usePatchUserMutation,
} from "../../services/user";
import { colors } from "../../themes/colors";
import { dimensions } from "../../utils/dimensions";
import BottomSheet from "../../components/BottomSheet";
import BottomSheetProvider, {
  BottomSheetContext,
} from "../../context/BottomSheetProvider";
import PopButton from "../../components/PopButton";
import EditNameSection from "./sections/EditNameSection";
import EditDescriptionSection from "./sections/EditDescriptionSection";
import EditAboutMeSection from "./sections/EditAboutMeSection";
import EditExperienceSection from "./sections/EditExperienceSection";
import EditSocialNetSection from "./sections/EditSocialNetSection";
import EditMailSection from "./sections/EditMailSection";
import { useNavigation } from "@react-navigation/native";
import EditNicknameSection from "./sections/EditNicknameSection";
import AuthServices from "../../services/AuthServices";
import SuccessModal from "../../components/SuccessModal";

const EditProfile = () => {
  const { data: user, isLoading } = useGetCurrentUserQuery();
  if (isLoading) return <View />;
  return <EditContent user={user} />;
};

const EditContent = ({ user = {} }) => {
  const navigation = useNavigation();
  const [triggerPatchUser] = usePatchUserMutation();
  const [disableButtons, setDisableButtons] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);

  const [name, setName] = useState(user.name || "");
  const [nickname, setNickname] = useState(user.nickname || "");
  const [description, setDescription] = useState(user.description || "");
  const [aboutMe, setAboutMe] = useState(user.aboutMe || "");
  const [experience, setExperience] = useState(user.experience || "");
  const [socialNet, setSocialNet] = useState(user.socialNet || {});

  const handleSaveChanges = () => {
    AuthServices.getCurrentAuthUser()
      .getIdToken()
      .then((idToken) => {
        setDisableButtons(true);
        triggerPatchUser({
          idToken,
          user: JSON.stringify({
            name: user.name === name ? undefined : name,
            nickname: user.nickname === nickname ? undefined : nickname,
            description:
              user.description === description ? undefined : description,
            aboutMe: user.aboutMe === aboutMe ? undefined : aboutMe,
            experience: user.experience === experience ? undefined : experience,
            socialNet,
          }),
        })
          .then(() => {
            setSuccessModalVisible(true);
            setTimeout(() => {
              navigation.goBack();
            }, 2000);
          })
          .finally(() => setDisableButtons(false));
      });
  };

  const handleCancel = () => {
    if (navigation.canGoBack()) navigation.goBack();
  };

  return (
    <BottomSheetProvider>
      <View style={styles.editProfile}>
        <View style={styles.appBarContainer}>
          <View style={styles.appBar}>
            <PopButton style={styles.popButton} />
            <Text style={styles.titleScreen}>EDITAR PERFIL</Text>
          </View>
        </View>
        <ScrollView
          contentContainerStyle={styles.layout}
          style={{ flex: 1 }}
          keyboardDismissMode="on-drag"
          overScrollMode="never"
          showsVerticalScrollIndicator={false}
        >
          <EditNameSection name={name} setName={setName} />
          <EditNicknameSection nickname={nickname} setNickname={setNickname} />
          <EditDescriptionSection
            description={description}
            setDescription={setDescription}
          />
          <EditAboutMeSection aboutMe={aboutMe} setAboutMe={setAboutMe} />
          <EditExperienceSection
            experience={experience}
            setExperience={setExperience}
          />
          <EditSocialNetSection
            socialNet={socialNet}
            setSocialNet={setSocialNet}
          />
          <EditMailSection socialNet={socialNet} setSocialNet={setSocialNet} />
        </ScrollView>
        <View style={styles.submitContainer}>
          <TouchableOpacity
            disabled={disableButtons}
            activeOpacity={0.85}
            style={styles.submitButton}
            onPress={() => handleSaveChanges()}
          >
            <Text style={styles.submitButtonLabel}>Guardar cambios</Text>
          </TouchableOpacity>
          <TouchableOpacity
            disabled={disableButtons}
            activeOpacity={0.85}
            style={[styles.submitButton, { backgroundColor: colors.surface }]}
            onPress={() => handleCancel()}
          >
            <Text
              style={[styles.submitButtonLabel, { color: colors.onBackground }]}
            >
              Cancelar
            </Text>
          </TouchableOpacity>
        </View>
        <EditProfileBottomSheet />
        <Modal
          animationType="fade"
          transparent={true}
          visible={successModalVisible}
          statusBarTranslucent
        >
          <SuccessModal title={"Perfil actualizado con éxito"} />
        </Modal>
      </View>
    </BottomSheetProvider>
  );
};

const EditProfileBottomSheet = () => {
  const { bottomSheetRef, sheetContent } = useContext(BottomSheetContext);
  return <BottomSheet ref={bottomSheetRef}>{sheetContent}</BottomSheet>;
};

const styles = StyleSheet.create({
  editProfile: {
    flex: 1,
    backgroundColor: colors.background,
  },
  layout: {
    gap: dimensions.layoutVerticalGap,
    paddingHorizontal: dimensions.layoutHorizontalPadding,
    paddingVertical: dimensions.layoutVerticalPadding,
  },
  appBar: {
    paddingVertical: dimensions.layoutVerticalPadding,
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
  },
  popButton: {
    position: "absolute",
    left: dimensions.layoutHorizontalPadding,
    alignSelf: "center",
  },
  row: {
    flexDirection: "row",
    flex: 1,
  },
  titleScreen: {
    fontFamily: "PoppinsBold",
    fontSize: dimensions.fontSizeTitle,
    color: colors.primary,
  },
  submitContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: dimensions.sectionHorizontalGap,
    paddingHorizontal: dimensions.layoutHorizontalPadding,
    paddingVertical: dimensions.layoutVerticalPadding,
  },
  submitButton: {
    paddingHorizontal: dimensions.sectionHorizontalPadding,
    paddingVertical: dimensions.sectionVerticalPadding,
    borderRadius: dimensions.sectionBorderRadius,
    backgroundColor: colors.primary,
  },
  submitButtonLabel: {
    fontFamily: "PoppinsBold",
    fontSize: dimensions.fontSizeSubTitle,
    color: colors.onPrimary,
  },
});

export default EditProfile;
