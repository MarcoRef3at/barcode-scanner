import React from "react";
import { StyleSheet, Text, View } from "react-native";

import AppTextInput from "./TextInput";
import RoundButton from "./RoundButton";

const CodeManualInput = ({ code, setCode, handleBarCodeScanned }) => {
  return (
    <View style={styles.container}>
      <AppTextInput
        placeholder="Enter Manually"
        onChangeText={(text) => setCode(text == "" ? null : text)}
        value={code}
        keyboardType={"numeric"}
      >
        {code && (
          <View style={styles.sendButton}>
            <RoundButton
              icon="send-circle"
              onPress={() => handleBarCodeScanned(code, code)}
            />
          </View>
        )}
      </AppTextInput>
    </View>
  );
};

export default CodeManualInput;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    paddingHorizontal: 20,
  },
  sendButton: {
    position: "absolute",
    right: 10,
    alignSelf: "center",
  },
});
