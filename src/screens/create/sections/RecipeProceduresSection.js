import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Octicons from "@expo/vector-icons/Octicons";
import React, { useContext } from "react";
import { colors } from "../../../themes/colors";
import { dimensions } from "../../../utils/dimensions";
import { BottomSheetContext } from "../../../context/BottomSheetProvider";
import DeleteModal from "../../../components/DeleteModal";
import ChildProcedureModal from "../../../components/ChildProcedureModal";

const isProcedureEmpty = (procedure) => {
  return (
    (procedure.title === undefined || procedure.title.trim() === "") &&
    (procedure.duration === undefined || procedure.duration <= 0) &&
    (procedure.children === undefined || isAllChildrenEmpty(procedure.children))
  );
};

const isAllChildrenEmpty = (children) => {
  for (const child of children) {
    if (!isChildEmpty(child)) {
      return false;
    }
  }
  return true;
};

const isChildEmpty = (child) => {
  return child.content === undefined || child.content.trim() === "";
};

const isAllProceduresEmpty = (procedures) => {
  for (const procedure of procedures) {
    if (!isProcedureEmpty(procedure)) {
      return false;
    }
  }
  return true;
};

const RecipeProceduresSection = ({ procedures, setProcedures }) => {
  const handleProceduresChange = (procedureIndex, text, key) => {
    const updatedProcedures = [...procedures];
    updatedProcedures[procedureIndex] = {
      ...updatedProcedures[procedureIndex],
      [key]: text,
    };
    setProcedures(updatedProcedures);
  };

  const handleChildrenChange = (procedureIndex, childIndex, text, key) => {
    const updatedProcedures = [...procedures];
    updatedProcedures[procedureIndex].children[childIndex] = {
      ...updatedProcedures[procedureIndex].children[childIndex],
      [key]: text,
    };
    setProcedures(updatedProcedures);
  };

  const handleProcedureDelete = (procedureIndex) => {
    if (procedures.length === 0) return;
    const updatedProcedures = [...procedures];
    if (procedureIndex >= 0 && procedureIndex < updatedProcedures.length) {
      updatedProcedures.splice(procedureIndex, 1);
      setProcedures(updatedProcedures);
    }
  };

  const handleChildDelete = (procedureIndex, childIndex) => {
    if (procedures.length === 0) return;
    const updatedProcedures = [...procedures];
    if (procedureIndex >= 0 && procedureIndex < updatedProcedures.length) {
      if (
        childIndex >= 0 &&
        childIndex < updatedProcedures[procedureIndex].children.length
      ) {
        updatedProcedures[procedureIndex].children.splice(childIndex, 1);
        setProcedures(updatedProcedures);
      }
    }
  };

  const handleNewProcedureSection = () => {
    setProcedures([...procedures, { children: [{ type: "step" }] }]);
  };

  const handleNewChildEntry = (procedureIndex, type) => {
    const updatedProcedures = [...procedures];
    updatedProcedures[procedureIndex].children = [
      ...updatedProcedures[procedureIndex].children,
      { type },
    ];
    setProcedures(updatedProcedures);
  };

  return (
    <View style={styles.section}>
      <View style={styles.row}>
        <Text style={styles.subTitle}>Procedimientos:</Text>
        {isAllProceduresEmpty(procedures) && (
          <Text style={styles.obligatory}>*</Text>
        )}
      </View>
      <View style={styles.layout}>
        {procedures.map((item, index) => (
          <ProcedureEntry
            key={`key-procedure-${index * 1}`}
            procedure={item}
            procedureIndex={index}
            onProceduresChange={handleProceduresChange}
            handleProcedureDelete={handleProcedureDelete}
            onChildrenChange={handleChildrenChange}
            handleChildDelete={handleChildDelete}
            handleNewChild={handleNewChildEntry}
          />
        ))}
        <View style={{ flexDirection: "row", flex: 1, alignItems: "center" }}>
          <View style={styles.divisorLine} />
          <TouchableOpacity
            activeOpacity={0.85}
            style={styles.addSectionButton}
            onPress={() => handleNewProcedureSection()}
          >
            <FontAwesome6
              name="add"
              size={dimensions.iconSize}
              color={colors.onPrimary}
            />
            <Text style={styles.addSectionButtonLabel}>Agregar sección</Text>
          </TouchableOpacity>
          <View style={styles.divisorLine} />
        </View>
      </View>
    </View>
  );
};

const ProcedureEntry = ({
  procedure = {},
  procedureIndex,
  onProceduresChange,
  handleProcedureDelete,
  onChildrenChange,
  handleChildDelete,
  handleNewChild,
}) => {
  let stepCounter = 0;

  const { setSheetContent, openBottomSheet, closeBottomSheet } =
    useContext(BottomSheetContext);

  const handleModalDeleteProcedure = () => {
    setSheetContent(
      <DeleteModal
        key={`modal-procedure-${procedureIndex}`}
        title={"¿Esta seguro de eliminar esta sección?"}
        onConfirm={() => {
          handleProcedureDelete(procedureIndex);
          closeBottomSheet(procedureIndex);
        }}
        onDismiss={() => closeBottomSheet(procedureIndex)}
      />
    );
    openBottomSheet();
  };

  const handleModalAddChild = () => {
    setSheetContent(
      <ChildProcedureModal
        key={`modal-child-${procedureIndex}`}
        onSelect={(selectedType) => {
          handleNewChild(procedureIndex, selectedType);
          closeBottomSheet(procedureIndex);
        }}
      />
    );
    openBottomSheet();
  };

  return (
    <View style={styles.section}>
      <View style={styles.header}>
        <Text style={[styles.label, styles.headerColumn1]}>
          Titulo de sección:
        </Text>
        <View
          style={[
            styles.headerColumn2,
            { flexDirection: "row", justifyContent: "space-between" },
          ]}
        >
          <Text style={styles.label}>Duración:</Text>
          <Pressable hitSlop={5} onPress={() => handleModalDeleteProcedure()}>
            <AntDesign
              name="delete"
              size={dimensions.iconSize}
              color={colors.primary}
            />
          </Pressable>
        </View>
      </View>
      <View style={styles.header}>
        <View style={styles.headerColumn1}>
          <TextInput
            style={styles.input}
            cursorColor={colors.primary}
            maxLength={50}
            value={procedure.title}
            onChangeText={(text) => {
              onProceduresChange(procedureIndex, text, "title");
            }}
          />
        </View>
        <View style={[styles.headerColumn2, styles.row]}>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            cursorColor={colors.primary}
            maxLength={4}
            value={String(procedure.duration || 0)}
            onChangeText={(text) => {
              const parsedText = parseInt(text.trim(), 10);
              onProceduresChange(
                procedureIndex,
                isNaN(parsedText) ? 0 : parsedText,
                "duration"
              );
            }}
          />
          <Text style={styles.label}>mins.</Text>
        </View>
      </View>
      {procedure.children?.map((item, index) => {
        if (item.type === "step") stepCounter++;
        return (
          <ChildEntry
            key={`key-child-${procedureIndex}-${index * 1}`}
            child={item}
            procedureIndex={procedureIndex}
            childIndex={index}
            step={stepCounter}
            onChildrenChange={onChildrenChange}
            handleChildDelete={handleChildDelete}
          />
        );
      })}
      <View style={{ flexDirection: "row", flex: 1, alignItems: "center" }}>
        <View style={styles.divisorLine} />
        <TouchableOpacity
          activeOpacity={0.85}
          style={[
            styles.addSectionButton,
            { backgroundColor: colors.onBackground },
          ]}
          onPress={() => handleModalAddChild()}
        >
          <Octicons
            name="comment-discussion"
            size={dimensions.iconSize}
            color={colors.background}
          />
          <Text
            style={[styles.addSectionButtonLabel, { color: colors.background }]}
          >
            Agregar pasos,{"\n"}consejos o alertas
          </Text>
        </TouchableOpacity>
        <View style={styles.divisorLine} />
      </View>
    </View>
  );
};

const ChildEntry = ({
  child = {},
  procedureIndex,
  childIndex,
  step,
  onChildrenChange,
  handleChildDelete,
}) => {
  return (
    <View style={styles.row}>
      {renderType(child.type, step)}
      <TextInput
        style={styles.input}
        cursorColor={colors.primary}
        multiline={true}
        maxLength={200}
        value={child.content}
        onChangeText={(text) => {
          onChildrenChange(procedureIndex, childIndex, text, "content");
        }}
      />
      <Pressable
        hitSlop={8}
        onPress={() => handleChildDelete(procedureIndex, childIndex)}
      >
        <AntDesign
          name="minuscircle"
          size={dimensions.smallIconSize}
          color={colors.primary}
        />
      </Pressable>
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
  },
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
  input: {
    borderRadius: dimensions.sectionBorderRadius,
    paddingHorizontal: dimensions.sectionHorizontalPadding,
    paddingVertical: dimensions.sectionVerticalPadding,
    flex: 1,

    fontFamily: "PoppinsRegular",
    fontSize: dimensions.fontSizeSubTitle,
    color: colors.onBackground,

    backgroundColor: colors.surface,
  },
  label: {
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
  },
  header: {
    gap: dimensions.sectionHorizontalGap,
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  headerColumn1: {
    flex: 6,
  },
  headerColumn2: {
    flex: 3.5,
  },
  divisorLine: {
    height: 2,
    flex: 1,
    backgroundColor: colors.surface,
  },
  addSectionButton: {
    borderRadius: dimensions.layoutBorderRadius,
    paddingHorizontal: 40,
    paddingVertical: dimensions.sectionVerticalPadding,
    backgroundColor: colors.primary,
    flexDirection: "row",
    alignItems: "center",
    gap: dimensions.sectionHorizontalGap,
  },
  addSectionButtonLabel: {
    color: colors.onPrimary,
    fontFamily: "PoppinsMedium",
    fontSize: dimensions.fontSizeSubTitle,
    textAlign: "center",
  },
});

export default RecipeProceduresSection;
