import { StyleSheet, Text, View } from "react-native";
import React from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { dimensions } from "../../../utils/dimensions";
import { colors } from "../../../themes/colors";

const ProceduresRender = ({ procedures }) => {
  return (
    <View style={styles.layout}>
      {procedures.map((item, index) => (
        <ProcedureSection key={`${index}-${item.title}`} procedure={item} />
      ))}
    </View>
  );
};

const ProcedureSection = ({ procedure }) => {
  let stepCount = 0;
  return (
    <View style={styles.section}>
      <View style={styles.header}>
        <Text style={styles.title}>{procedure.title}</Text>
        <Text style={styles.duration}>{`${procedure.duration} min.`}</Text>
      </View>
      <View style={styles.section}>
        {procedure.children?.map((item, index) => {
          if (item.type === "step") stepCount++;
          return (
            <ProcedureChild
              key={`${index}-${item.type}`}
              child={item}
              extra={renderType(item.type, stepCount)}
            />
          );
        })}
      </View>
    </View>
  );
};

const ProcedureChild = ({ child, extra }) => {
  return (
    <View
      style={{ flexDirection: "row", gap: dimensions.sectionHorizontalGap }}
    >
      {extra}
      <View style={{flex:1}}>
        <Text style={styles.subTitle}>{child.content}</Text>
      </View>
    </View>
  );
};

const renderType = (type, step) => {
  switch (type) {
    case "step":
      return (
        <View style={[styles.extra, { backgroundColor: colors.primary }]}>
          <Text style={styles.step}>{String(step)}</Text>
        </View>
      );
    case "tip":
      return (
        <View style={styles.extra}>
          <MaterialIcons
            name="tips-and-updates"
            size={dimensions.smallIconSize}
            color={colors.primary}
          />
        </View>
      );
    case "warning":
      return (
        <View style={styles.extra}>
          <FontAwesome
            name="warning"
            size={dimensions.smallIconSize}
            color={colors.primary}
          />
        </View>
      );
    default:
      return null;
  }
};

const styles = StyleSheet.create({
  layout: {
    gap: dimensions.layoutVerticalGap,
    paddingLeft: 5 
  },
  section: {
    paddingHorizontal: 5,
    gap: dimensions.sectionVerticalGap,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  title: {
    fontFamily: "PoppinsMedium",
    fontSize: dimensions.fontSizeTitle,
    color: colors.onBackground,
  },
  duration: {
    fontFamily: "PoppinsMedium",
    fontSize: dimensions.fontSizeSmall,
    color: colors.onTertiary,
  },
  subTitle: {
    fontFamily: "PoppinsRegular",
    fontSize: dimensions.fontSizeSubTitle,
    color: colors.onBackground,
  },
  extra: {
    height: 20,
    width: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  step: {
    color: colors.onPrimary,
    fontFamily: "PoppinsMedium",
    fontSize: dimensions.fontSizeSubTitle,
  }
});

export default ProceduresRender;
