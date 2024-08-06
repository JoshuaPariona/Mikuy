import { Pressable, Text } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import React, { useState } from "react";
import AnimatedFadeSwitchComponent from "./animated/AnimatedFadeSwitchComponent";
import { dimensions } from "../utils/dimensions";
import { colors } from "../themes/colors";
import PropTypes from "prop-types";
import NotifierController from "../controllers/NotifierController";

const BookMarkButton = (props) => {
  const { style, item, initialState } = props;
  const [pressed, setPressed] = useState(initialState);

  return (
    <Pressable
      style={[
        style,
        {
          alignItems: "center",
          justifyContent: "center",
        },
      ]}
      onPress={() => {
        setPressed(!pressed);
        if (!pressed) {
          NotifierController.goNotification(
            <Text
              style={{
                color: colors.onSurface,
                fontSize: dimensions.fontSizeSubTitle,
              }}
            >
              {item.name}, se guardo en tu lista de recetas.
            </Text>
          );
        }
      }}
    >
      <AnimatedFadeSwitchComponent
        toggle={pressed}
        firstComponent={
          <MaterialCommunityIcons
            name="bookmark-minus-outline"
            size={dimensions.iconSize}
            color={colors.primary}
          />
        }
        secondComponent={
          <MaterialCommunityIcons
            name="bookmark-minus"
            size={dimensions.iconSize}
            color={colors.primary}
          />
        }
      />
    </Pressable>
  );
};

BookMarkButton.propTypes = {
  style: PropTypes.object,
  item: PropTypes.any.isRequired,
  initialState: PropTypes.bool.isRequired,
};

export default BookMarkButton;
