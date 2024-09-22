import { StyleSheet, Text, View } from "react-native";
import React from "react";
import DropDownList from "../../../components/DropDownList";
import { dimensions } from "../../../utils/dimensions";
import { colors } from "../../../themes/colors";
import { useGetRecipeCategoriesQuery } from "../../../services/recipe";

const RecipeCategorySection = ({ categoryId, setCategoryId }) => {
  const { data: categories, isLoading } = useGetRecipeCategoriesQuery();

  if (isLoading) return <View />;

  return (
    <View style={[styles.section, { flex: 1 }]}>
      <View style={styles.row}>
        <Text style={styles.subTitle}>Categorias:</Text>
        {(categoryId === "" ||
          !categories.some((category) => category.id === categoryId)) && (
          <Text style={styles.obligatory}>*</Text>
        )}
      </View>
      <DropDownList
        data={categories}
        labelKey={"name"}
        initLabel={
          categories.find((item) => item.id === categoryId)?.name || ""
        }
        onSelect={(item) => setCategoryId(item.id)}
      />
    </View>
  );
};

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
  obligatory: {
    color: colors.error,
  },
});

export default RecipeCategorySection;
