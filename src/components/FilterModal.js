import {
  FlatList,
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext } from "react";
import { dimensions } from "../utils/dimensions";
import { colors } from "../themes/colors";
import { SearchInputContext } from "../context/SearchInputProvider";
import { BottomSheetContext } from "../context/BottomSheetProvider";
import Entypo from "@expo/vector-icons/Entypo";
import { useGetRecipeCategoriesQuery } from "../services/recipe";

const FilterModal = () => {
  const { clearFilter } = useContext(SearchInputContext);
  const { closeBottomSheet } = useContext(BottomSheetContext);

  return (
    <View style={styles.modal}>
      <View style={styles.layout}>
        <View style={styles.header}>
          <Text style={styles.titleScreen}>Filtros</Text>
          <Pressable hitSlop={5} onPress={() => clearFilter()}>
            <Text style={styles.cleanFilter}>Limpiar</Text>
          </Pressable>
        </View>
        <View style={styles.section}>
          <Text style={styles.subTitle}>Categoría:</Text>
          <CategoryCarousel />
        </View>
        <View style={styles.section}>
          <Text style={styles.subTitle}>Nivel de dificultad:</Text>
          <RadioButtons />
        </View>
        <View style={styles.rowSection}>
          <View
            style={[
              styles.section,
              { flex: 1, justifyContent: "space-between" },
            ]}
          >
            <Text style={styles.subTitle}>Cantidad de porciones:</Text>
            <ServingsFilter />
          </View>
          <View style={[styles.section, { flex: 1 }]}>
            <Text style={styles.subTitle}>Maximo tiempo de duración:</Text>
            <DurationFilter />
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.subTitle}>Minima calificación de la receta:</Text>
          <RatingFilter />
        </View>
      </View>
      <TouchableOpacity
        activeOpacity={0.85}
        style={styles.collapseButton}
        onPress={() => {
          Keyboard.dismiss();
          closeBottomSheet();
        }}
      >
        <Entypo
          name="chevron-down"
          size={dimensions.iconSize}
          color={colors.onPrimary}
        />
      </TouchableOpacity>
    </View>
  );
};

const CategoryCarousel = () => {
  const { data: categories, isLoading } = useGetRecipeCategoriesQuery();

  if (isLoading) return <View />;

  return (
    <FlatList
      key={"modal-categories"}
      keyExtractor={(item) => item.id}
      data={categories}
      contentContainerStyle={{ gap: 15 }}
      renderItem={({ item }) => <CategoryItem key={item.id} item={item} />}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      overScrollMode="never"
    />
  );
};

const CategoryItem = ({ item }) => {
  const { category, setCategory } = useContext(SearchInputContext);

  const isCurrent = category === item.id;

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      style={[
        styles.categoryButton,
        isCurrent ? null : { backgroundColor: colors.surface },
      ]}
      onPress={() => setCategory(item.id)}
    >
      <Text
        style={[
          styles.categoryButtonLabel,
          isCurrent ? null : { color: colors.onBackground },
        ]}
      >
        {item.name}
      </Text>
    </TouchableOpacity>
  );
};

const RadioButtons = () => {
  const { difficulty, setDifficulty } = useContext(SearchInputContext);

  return (
    <View
      style={{ flexDirection: "row", flex: 1, justifyContent: "space-between" }}
    >
      <Pressable style={styles.row} onPress={() => setDifficulty("fácil")}>
        <View
          style={[
            styles.radio,
            {
              backgroundColor:
                difficulty === "fácil" ? colors.primary : "transparent",
            },
          ]}
        />
        <Text style={styles.label}>Fácil</Text>
      </Pressable>
      <Pressable style={styles.row} onPress={() => setDifficulty("intermedio")}>
        <View
          style={[
            styles.radio,
            {
              backgroundColor:
                difficulty === "intermedio" ? colors.primary : "transparent",
            },
          ]}
        />
        <Text style={styles.label}>Intermedio</Text>
      </Pressable>
      <Pressable style={styles.row} onPress={() => setDifficulty("avanzado")}>
        <View
          style={[
            styles.radio,
            {
              backgroundColor:
                difficulty === "avanzado" ? colors.primary : "transparent",
            },
          ]}
        />
        <Text style={styles.label}>Avanzado</Text>
      </Pressable>
    </View>
  );
};

const ServingsFilter = () => {
  const { servings, setServings } = useContext(SearchInputContext);
  return (
    <TextInput
      style={styles.inputNumber}
      cursorColor={colors.primary}
      maxLength={2}
      keyboardType="numeric"
      value={String(servings)}
      textAlign="center"
      onChangeText={(text) => {
        const parsedText = parseInt(text.trim(), 10);
        setServings(isNaN(parsedText) || parsedText < 0 ? 0 : parsedText);
      }}
    />
  );
};

const DurationFilter = () => {
  const { duration, setDuration } = useContext(SearchInputContext);
  return (
    <TextInput
      style={styles.inputNumber}
      cursorColor={colors.primary}
      maxLength={4}
      keyboardType="numeric"
      value={String(duration)}
      textAlign="center"
      onChangeText={(text) => {
        const parsedText = parseInt(text.trim(), 10);
        setDuration(isNaN(parsedText) || parsedText < 0 ? 0 : parsedText);
      }}
    />
  );
};

const regexFloat = /^(?:[0-4](?:\.\d{0,1})?|5(?:\.0)?)$/;

const RatingFilter = () => {
  const { averageRating, setAverageRating } = useContext(SearchInputContext);
  return (
    <TextInput
      style={styles.inputNumber}
      cursorColor={colors.primary}
      maxLength={3}
      keyboardType="numeric"
      value={String(averageRating)}
      textAlign="center"
      onChangeText={(text) => {
        const parsedText = parseFloat(text.trim());
        setAverageRating(isNaN(parsedText) || parsedText < 0 ? 0 : parsedText);
        
      }}
    />
  );
};

export default FilterModal;

const styles = StyleSheet.create({
  modal: {
    width: "100%",
    gap: dimensions.layoutVerticalGap,
    paddingHorizontal: dimensions.layoutHorizontalPadding,
    paddingVertical: dimensions.layoutVerticalPadding,
    alignItems: "center",
  },
  layout: {
    width: "100%",
    gap: dimensions.layoutVerticalGap,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  titleScreen: {
    fontFamily: "PoppinsBold",
    fontSize: dimensions.fontSizeTitle,
    color: colors.primary,
  },
  cleanFilter: {
    fontFamily: "PoppinsRegular",
    fontSize: dimensions.fontSizeSmall,
    color: colors.onTertiary,
  },
  section: {
    gap: dimensions.sectionVerticalGap,
  },
  rowSection: {
    gap: dimensions.sectionHorizontalGap,
    flexDirection: "row",
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
  collapseButton: {
    justifySelf: "center",
    backgroundColor: colors.primary,
    paddingHorizontal: dimensions.sectionHorizontalPadding,
    paddingVertical: dimensions.sectionVerticalPadding,
    borderRadius: dimensions.sectionBorderRadius,
  },
  categoryButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 20,
  },
  categoryButtonLabel: {
    fontFamily: "PoppinsMedium",
    fontSize: dimensions.fontSizeSubTitle,
    color: colors.onPrimary,
  },
  radio: {
    height: 15,
    width: 15,
    borderColor: colors.onTertiary,
    borderWidth: 1,
    borderRadius: 8,
  },
  label: {
    fontFamily: "PoppinsRegular",
    fontSize: dimensions.fontSizeSubTitle,
    color: colors.onBackground,
  },
  inputNumber: {
    borderRadius: dimensions.sectionBorderRadius,
    paddingHorizontal: dimensions.sectionHorizontalPadding,
    paddingVertical: dimensions.sectionVerticalPadding,

    fontFamily: "PoppinsRegular",
    fontSize: dimensions.fontSizeSubTitle,
    color: colors.onBackground,
    backgroundColor: colors.surface,
  },
});
