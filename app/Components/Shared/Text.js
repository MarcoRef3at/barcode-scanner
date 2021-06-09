import React from "react";
import { Text, StyleSheet } from "react-native";

function AppText({ children, style, ...otherProps }) {
  return (
    <Text style={[styles.text, style]} {...otherProps}>
      {children}
    </Text>
  );
}

export default AppText;

const styles = StyleSheet.create({
  text: {
    color: "#0c0c0c",
    fontSize: 18,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
    justifyContent: "center",
  },
});
