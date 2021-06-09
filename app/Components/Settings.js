import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AppTextInput from "./Shared/TextInput";
import AppButton from "./Shared/Button";

const Settings = ({ navigation: { goBack, navigate } }) => {
  const [api, setApi] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    (async () => {
      const recordedApi = await AsyncStorage.getItem("api");
      recordedApi && setApi(recordedApi);

      const recordedPassword = await AsyncStorage.getItem("pass");
      recordedPassword && setPassword(recordedPassword);
    })();
  }, []);
  return (
    <View style={styles.modalView}>
      <AppTextInput
        placeholder="Enter the API"
        onChangeText={(text) => setApi(text)}
        value={api}
      />

      <AppTextInput
        placeholder="Enter your Password"
        onChangeText={(text) => setPassword(text)}
        value={password}
        textContentType="password"
        secureTextEntry
        autoCapitalize="none"
        autoCorrect={false}
      />

      <AppButton
        title="Save"
        onPress={() => {
          AsyncStorage.setItem("api", api);
          AsyncStorage.setItem("pass", password).then(() => {
            navigate("Scanner");
          });
        }}
      />
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f8f4f4",
    borderRadius: 25,
    flexDirection: "row",
    padding: 15,
    marginVertical: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    position: "absolute",
    bottom: 20,
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    alignSelf: "flex-end",
    marginTop: -5,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    color: "#0c0c0c",
    fontSize: 18,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
    justifyContent: "center",
  },
  textInput: {
    color: "#0c0c0c",
    fontSize: 18,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
    justifyContent: "center",
  },
});
