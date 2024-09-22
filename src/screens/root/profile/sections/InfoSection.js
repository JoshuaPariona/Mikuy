import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { dimensions } from "../../../../utils/dimensions";
import { colors } from "../../../../themes/colors";
import { images } from "../../../../utils/images";
import { useGetCurrentUserQuery } from "../../../../services/user";

const InfoSection = () => {
  const { data: user, isLoading } = useGetCurrentUserQuery();
  if (isLoading) return <View></View>;
  return (
    <View style={styles.layout}>
      <View style={styles.section}>
        <View style={styles.row}>
          <Ionicons
            name="book-outline"
            size={dimensions.iconSize}
            color={colors.primary}
          />
          <Text style={styles.title}>Sobre mí:</Text>
        </View>
        <Text style={styles.subTitle}>{user.aboutMe}</Text>
      </View>

      <View style={styles.section}>
        <View style={styles.row}>
          <MaterialCommunityIcons
            name="chef-hat"
            size={dimensions.iconSize}
            color={colors.primary}
          />
          <Text style={styles.title}>Experiencia profesional:</Text>
        </View>
        <Text style={styles.subTitle}>{user.experience}</Text>
      </View>

      <View style={styles.section}>
        <View style={styles.row}>
          <Ionicons
            name="megaphone-outline"
            size={dimensions.iconSize}
            color={colors.primary}
          />
          <Text style={styles.title}>Redes sociales:</Text>
        </View>
        {user.socialNet?.whatsapp && (
          <View style={[styles.row, { paddingLeft: 20, gap: 20 }]}>
            <Image style={styles.socialIcon} source={images.whatsapp} />
            <Text>{user.socialNet?.whatsapp}</Text>
          </View>
        )}
        {user.socialNet?.facebook && (
          <View style={[styles.row, { paddingLeft: 20, gap: 20 }]}>
            <Image style={styles.socialIcon} source={images.facebook} />
            <Text>{user.socialNet?.facebook}</Text>
          </View>
        )}
        {user.socialNet?.instagram && (
          <View style={[styles.row, { paddingLeft: 20, gap: 20 }]}>
            <Image style={styles.socialIcon} source={images.instagram} />
            <Text>{user.socialNet?.instagram}</Text>
          </View>
        )}
        {user.socialNet?.tiktok && (
          <View style={[styles.row, { paddingLeft: 20, gap: 20 }]}>
            <Image style={styles.socialIcon} source={images.tiktok} />
            <Text>{user.socialNet?.tiktok}</Text>
          </View>
        )}
      </View>

      <View style={styles.section}>
        <View style={styles.row}>
          <Ionicons
            name="mail-outline"
            size={dimensions.iconSize}
            color={colors.primary}
          />
          <Text style={styles.title}>Contacto:</Text>
        </View>
        <Text style={styles.subTitle}>{user.socialNet?.email}</Text>
      </View>
    </View>
  );
};

export default InfoSection;

const styles = StyleSheet.create({
  layout: {
    gap: dimensions.layoutVerticalGap,
    width: "100%",
  },
  section: {
    gap: dimensions.sectionVerticalGap,
  },
  row: {
    flexDirection: "row",
    gap: dimensions.subSectionHorizontalGap,
    alignItems: "center",
  },
  column: {
    alignItems: "center",
  },
  title: {
    fontFamily: "PoppinsMedium",
    fontSize: dimensions.fontSizeTitle,
    color: colors.onBackground,
  },
  subTitle: {
    fontFamily: "PoppinsRegular",
    fontSize: dimensions.fontSizeSubTitle,
    color: colors.onBackground,
  },
  socialIcon: {
    width: 30,
    height: 30,
  },
});
