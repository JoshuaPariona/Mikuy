import { StyleSheet, Text, TextInput, View, Image } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { dimensions } from "../../../utils/dimensions";
import { colors } from "../../../themes/colors";
import { images } from "../../../utils/images";

// value={}
// onChangeText={}

const EditSocialNetSection = ({ socialNet, setSocialNet }) => {
  return (
    <View style={styles.section}>
      <View style={styles.row}>
        <Ionicons
          name="megaphone-outline"
          size={dimensions.iconSize}
          color={colors.onBackground}
        />
        <Text style={styles.subTitle}>Redes sociales:</Text>
      </View>
      <View
        style={[
          styles.section,
          { paddingLeft: dimensions.sectionHorizontalPadding },
        ]}
      >
        <View style={styles.row}>
          <Image style={styles.socialIcon} source={images.whatsapp} />
          <TextInput
            style={styles.input}
            cursorColor={colors.primary}
            maxLength={15}
            keyboardType="numeric"
            value={socialNet.whatsapp}
            onChangeText={(text) =>
              setSocialNet({ ...socialNet, whatsapp: text })
            }
          />
        </View>
        <View style={styles.row}>
          <Image style={styles.socialIcon} source={images.facebook} />
          <TextInput
            style={styles.input}
            cursorColor={colors.primary}
            maxLength={70}
            value={socialNet.facebook}
            onChangeText={(text) =>
              setSocialNet({ ...socialNet, facebook: text })
            }
          />
        </View>
        <View style={styles.row}>
          <Image style={styles.socialIcon} source={images.instagram} />
          <TextInput
            style={styles.input}
            cursorColor={colors.primary}
            maxLength={20}
            value={socialNet.instagram}
            onChangeText={(text) =>
              setSocialNet({ ...socialNet, instagram: text.trim() })
            }
          />
        </View>
        <View style={styles.row}>
          <Image style={styles.socialIcon} source={images.tiktok} />
          <TextInput
            style={styles.input}
            cursorColor={colors.primary}
            maxLength={20}
            value={socialNet.tiktok}
            onChangeText={(text) =>
              setSocialNet({ ...socialNet, tiktok: text.trim() })
            }
          />
        </View>
      </View>
    </View>
  );
};

export default EditSocialNetSection;

const styles = StyleSheet.create({
  section: {
    gap: dimensions.sectionVerticalGap,
  },
  row: {
    gap: dimensions.sectionHorizontalGap,
    flexDirection: "row",
    alignItems: "center",
  },
  subTitle: {
    fontFamily: "PoppinsMedium",
    fontSize: dimensions.fontSizeSubTitle,
    color: colors.onBackground,
  },
  input: {
    flex: 1,
    borderRadius: dimensions.sectionBorderRadius,
    paddingHorizontal: dimensions.sectionHorizontalPadding,
    paddingVertical: dimensions.sectionVerticalPadding,

    fontFamily: "PoppinsRegular",
    fontSize: dimensions.fontSizeSubTitle,
    color: colors.onBackground,

    backgroundColor: colors.surface,
  },
  socialIcon: {
    width: 30,
    height: 30,
  },
});
