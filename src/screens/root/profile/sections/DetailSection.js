import { StyleSheet, Text, View } from "react-native";
import React from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { colors } from "../../../../themes/colors";
import { dimensions } from "../../../../utils/dimensions";
import { useGetCurrentUserQuery } from "../../../../services/user";

const DetailSection = () => {
  const { data: user, isLoading } = useGetCurrentUserQuery();
  if (isLoading) return <View></View>;
  return (
    <View style={styles.section}>
      <View style={styles.row}>
        <Text style={styles.title}>{user.name}</Text>
        {user.verified && (
          <MaterialIcons
            name="verified"
            size={dimensions.smallIconSize}
            color={colors.primary}
          />
        )}
      </View>
      <Text style={styles.subTitle}>@{user.nickname}</Text>
      <Text style={styles.subTitle}>{user.description}</Text>
      <View style={styles.row}>
        <View style={styles.column}>
          <Text style={styles.title}>{user.createdRecipes?.length}</Text>
          <Text style={styles.subTitle}>Recetas</Text>
        </View>
        <View
          style={{
            height: "100%",
            width: 1,
            backgroundColor: colors.onTertiary,
          }}
        />
        <View style={styles.column}>
          <Text style={styles.title}>{user.followers || 0}</Text>
          <Text style={styles.subTitle}>Seguidores</Text>
        </View>
        <View
          style={{
            height: "100%",
            width: 1,
            backgroundColor: colors.onTertiary,
          }}
        /> 
        <View style={styles.column}>
          <Text style={styles.title}>{user.following?.length}</Text>
          <Text style={styles.subTitle}>Siguiendo</Text>
        </View>
      </View>
    </View>
  );
};

export default DetailSection;

const styles = StyleSheet.create({
  section: {
    gap: dimensions.sectionVerticalGap,
    alignItems: "center",
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
    color: colors.onTertiary,
  },
});
