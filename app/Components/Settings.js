import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Settings = () => {
  const [api, setApi] = useState("https://postman-echo.com/post");
  const [password, setPassword] = useState("");

  useEffect(() => {
    (async () => {
      const recordedApi = await AsyncStorage.getItem("api");
      console.log("recordedApi:", recordedApi);
      if (recordedApi) {
        setApi(recordedApi);
      }
    })();
  }, []);
  return (
    <View style={styles.modalView}>
      <Text style={styles.modalText}>Enter the API</Text>
      <TextInput
        style={{ width: 350, borderColor: "gray", borderWidth: 1 }}
        onChangeText={(text) => setApi(text)}
        value={api}
      />
      <Text style={styles.modalText}>Enter your Password</Text>
      <TextInput
        style={{ width: 350, borderColor: "gray", borderWidth: 1 }}
        onChangeText={(text) => setPassword(text)}
        value={password}
        textContentType="password"
        secureTextEntry={true}
      />
      <TouchableHighlight
        style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
        onPress={() => {
          AsyncStorage.setItem("api", api);
          AsyncStorage.setItem("pass", password);
        }}
      >
        <Text style={styles.textStyle}>Save</Text>
      </TouchableHighlight>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
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
    marginBottom: 15,
    textAlign: "center",
  },
});
