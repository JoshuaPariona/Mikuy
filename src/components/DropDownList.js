import { StyleSheet, Text, View, FlatList, Pressable, ScrollView } from "react-native";
import React, { useState } from "react";
import AnimatedExpandableView from "./animated/AnimatedExpandableView";
import Entypo from "@expo/vector-icons/Entypo";
import { dimensions } from "../utils/dimensions";
import { colors } from "../themes/colors";

const DropDownList = ({ data, labelKey, initLabel, onSelect }) => {
  const [visibility, setVisibility] = useState(false);
  return (
    <View style={styles.dropDownList}>
      <Pressable style={styles.box} onPress={() => setVisibility(!visibility)}>
        <Text style={styles.label}>{initLabel}</Text>
        <Entypo
          name={visibility ? "chevron-up" : "chevron-down"}
          size={dimensions.smallIconSize}
          color={colors.onBackground}
        />
      </Pressable>
      <AnimatedExpandableView
        minSize={[null, 0]}
        maxSize={[null, 80]}
        visibility={visibility}
      >
        <ScrollView nestedScrollEnabled showsVerticalScrollIndicator={false} overScrollMode="never">
          {data.map((item, index) => (
            <Pressable
              key={index}
              style={styles.box}
              onPress={() => {
                onSelect(item);
                setVisibility(false);
              }}
            >
              <Text style={styles.label}>{item[labelKey]}</Text>
            </Pressable>
          ))}
        </ScrollView>
      </AnimatedExpandableView>
    </View>
  );
};

export default DropDownList;

const styles = StyleSheet.create({
  dropDownList: {
    borderRadius: dimensions.sectionBorderRadius,
    backgroundColor: colors.surface,
  },
  label: {
    fontFamily: "PoppinsRegular",
    fontSize: dimensions.fontSizeSubTitle,
    color: colors.onBackground,
  },
  box: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    overflow: "visible",
    paddingHorizontal: dimensions.sectionHorizontalPadding,
    paddingVertical: 13,
  },
});
