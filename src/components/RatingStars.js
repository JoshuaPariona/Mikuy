import { View } from "react-native";
import React from "react";

import FontAwesome from "@expo/vector-icons/FontAwesome";
import { colors } from "../themes/colors";
import { dimensions } from "../utils/dimensions";

const RatingStars = ({
  rating,
  size = dimensions.iconSize,
  color = colors.primary,
}) => {
  const renderStars = () => {
    const totalStars = 5;
    let stars = [];
    let icon = "";

    for (let i = 0; i < totalStars; i++) {
      if (rating >= i + 1) {
        icon = "star";
      } else if (rating > i && rating < i + 1) {
        icon = "star-half-o";
      } else {
        icon = "star-o";
      }
      stars.push(<FontAwesome key={i} name={icon} size={size} color={color} />);
    }

    return stars;
  };

  return <View style={{ flexDirection: "row", gap: 15 }}>{renderStars()}</View>;
};

export default RatingStars;
