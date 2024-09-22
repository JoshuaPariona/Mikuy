import {StyleSheet } from "react-native";
import { dimensions } from "../utils/dimensions";
import { colors } from "../themes/colors";
import PropTypes from "prop-types";
import Feather from "@expo/vector-icons/Feather";
import PrincipalButtonView from "./PrincipalButtonView";


const NextButton = ({onPress, children}) => {
  return (
    <PrincipalButtonView
      style={styles.nextButton}
      onPress={() => onPress()}
    >
      {children}
      <Feather
        name="chevron-right"
        size={dimensions.iconSize}
        color={colors.onPrimary}
      />
    </PrincipalButtonView>
  );
};

NextButton.propTypes = {
  onPress: PropTypes.func,
  children: PropTypes.node
}

const styles = StyleSheet.create({
  nextButton: {
    position: "absolute",
    flexDirection: "row",
    right: 0,
    bottom: dimensions.layoutVerticalPadding,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.primary,
    paddingHorizontal: 10,
    minWidth: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default NextButton;
