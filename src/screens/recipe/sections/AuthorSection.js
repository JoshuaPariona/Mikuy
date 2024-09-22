import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { dimensions } from "../../../utils/dimensions";
import { colors } from "../../../themes/colors";
import { useGetUserByIdQuery } from "../../../services/user";
import { images } from "../../../utils/images";
import AuthorButton from "../../../components/AuthorButton";

const AuthorSection = ({ authorId = "" }) => {
  const { data: author, isLoading } = useGetUserByIdQuery(authorId);

  if (isLoading) return <View />;

  const source = author.image ? { uri: author.image } : images.userMikuy;

  return (
    <AuthorButton authorId={authorId}> 
      <View
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          backgroundColor: colors.onBackground,
          borderRadius: dimensions.sectionBorderRadius,
          opacity: 0.1,
          transform: [{ scaleX: 1.02 }, { scaleY: 1.02 }, { translateY: 3 }],
        }}
      />
      <View style={styles.section}>
        <Image style={styles.userImage} source={source} />
        <View>
          <Text style={styles.title}>{author.name || "Mikuycito"}</Text>
          <Text style={styles.subTitle}>{`@${
            author.nickname || "mikuycito"
          }`}</Text>
        </View>
      </View>
    </AuthorButton>
  );
};

export default AuthorSection;

const styles = StyleSheet.create({
  section: {
    flexDirection: "row",
    paddingHorizontal: dimensions.sectionHorizontalPadding,
    paddingVertical: dimensions.sectionVerticalPadding,
    gap: dimensions.sectionHorizontalGap,
    alignItems: "center",
    backgroundColor: colors.background,
    borderTopLeftRadius: dimensions.sectionBorderRadius,
    borderTopRightRadius: dimensions.sectionBorderRadius,
    borderBottomLeftRadius: dimensions.sectionBorderRadius,
    borderBottomRightRadius: dimensions.sectionBorderRadius,
  },
  userImage: {
    height: dimensions.circleAvatarSizeMedium,
    width: dimensions.circleAvatarSizeMedium,
    borderRadius: 25,
  },
  title: {
    fontFamily: "PoppinsMedium",
    fontSize: dimensions.fontSizeSubTitle,
    color: colors.onBackground,
  },
  subTitle: {
    fontFamily: "PoppinsMedium",
    fontSize: dimensions.fontSizeSmall,
    color: colors.onTertiary,
  },
});
