import { Pressable, View } from "react-native";
import React from "react";

import FontAwesome from "@expo/vector-icons/FontAwesome";
import { colors } from "../themes/colors";
import { dimensions } from "../utils/dimensions";

const PressableRatingStars = ({
  stars: pressedStars,
  onStarPress,
  size = dimensions.iconSize,
  color = colors.primary,
}) => {
  const renderStars = () => {
    const totalStars = 5;
    const stars = [];
    for (let i = 0; i < totalStars; i++) {
      if (i <= pressedStars) {
        stars.push(
          <Pressable
            key={i}
            onPress={() => {
              onStarPress?.(i);
            }}
            hitSlop={5}
          >
            <FontAwesome name={"star"} size={size} color={color} />
          </Pressable>
        );
      } else {
        stars.push(
          <Pressable
            key={i}
            onPress={() => {
              onStarPress?.(i);
            }}
            hitSlop={5}
          >
            <FontAwesome name={"star-o"} size={size} color={color} />
          </Pressable>
        );
      }
    }

    return stars;
  };
  return <View style={{ flexDirection: "row", gap: 15 }}>{renderStars()}</View>;
};

export default PressableRatingStars;
