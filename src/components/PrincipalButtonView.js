import { TouchableOpacity } from "react-native";
import React from "react";
import PropTypes from "prop-types";
import { colors } from "../themes/colors";

const PrincipalButtonView = ({ style, onPress, children }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      style={[{ backgroundColor: colors.primary }, style]}
      onPress={onPress}
    >
      {children}
    </TouchableOpacity>
  );
};

PrincipalButtonView.propTypes = {
  style: PropTypes.object,
  onPress: PropTypes.func,
  children: PropTypes.node,
};

export default PrincipalButtonView;
