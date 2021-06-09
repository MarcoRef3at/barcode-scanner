import React from "react";
import { View, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function RoundButton({
  onPress,
  icon = "plus-circle",
  disabled = false,
  backgroundColor = "#003f88",
  color = "#fff",
  size = 40,
}) {
  return (
    <TouchableOpacity onPress={onPress} disabled={disabled}>
      <View
        style={[
          {
            width: size,
            height: size,
            borderRadius: 50,
            justifyContent: "center",
            alignItems: "center",
          },
          { backgroundColor: disabled ? "#344456" : backgroundColor },
        ]}
      >
        <MaterialCommunityIcons name={icon} color={color} size={size} />
      </View>
    </TouchableOpacity>
  );
}

export default RoundButton;
