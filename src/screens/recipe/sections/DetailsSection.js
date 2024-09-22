import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { dimensions } from "../../../utils/dimensions";
import { colors } from "../../../themes/colors";
import ProceduresRender from "../components/ProceduresRender";

const DetailsSection = ({ recipe }) => {
  return (
    <View style={styles.layout}>
      <View style={styles.section}>
        <Text style={styles.title}>Descripción:</Text>
        <Text style={styles.subTitle}>{recipe.description || ""}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.title}>Ingredientes:</Text>
        <View>
          {recipe.ingredients.map((item) => (
            <View
              key={item.name}
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={styles.subTitle}>{`\u2022  ${
                item.name || ""
              }`}</Text>
              <Text style={styles.ingredient}>
                {item.quantity || 0} {item.unit || ""}
              </Text>
            </View>
          ))}
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.title}>Procedimientos:</Text>
        <ProceduresRender procedures={recipe.procedures} />
      </View>
    </View>
  );
};

export default DetailsSection;

const styles = StyleSheet.create({
  layout: {
    gap: dimensions.layoutVerticalGap,
  },
  section: {
    gap: dimensions.sectionVerticalGap,
  },
  title: {
    fontFamily: "PoppinsMedium",
    fontSize: dimensions.fontSizeTitle,
    color: colors.onBackground
  },
  subTitle: {
    fontFamily: "PoppinsRegular",
    fontSize: dimensions.fontSizeSubTitle,
    color: colors.onBackground
  },
  ingredient: {
    fontFamily: "PoppinsRegular",
    fontSize: dimensions.fontSizeSmall,
    color: colors.onTertiary
  },
});
