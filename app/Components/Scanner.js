import React, { useState, useEffect } from "react";
import { Text, StyleSheet, Alert } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ApiRequest from "./../api/request";
export default function Scanner() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [api, setApi] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
      const recordedApi = await AsyncStorage.getItem("api");
      if (recordedApi) {
        setApi(recordedApi);
      }
      const recordedPassword = await AsyncStorage.getItem("pass");
      if (recordedPassword) {
        setPassword(recordedPassword);
      }
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    let postbody = {
      pss: password,
      Cd: data,
    };
    postbody = JSON.stringify(postbody);
    setScanned(true);
    ApiRequest(api, postbody).then((res) => {
      console.log("res:", res.data);
      setScanned(false);
    });
    // Alert.alert(
    //   "Code Detected",
    //   `${data}`, // <- this part is optional, you can pass an empty string
    //   [
    //     {
    //       text: "Cancel",
    //       onPress: () => {
    //         setScanned(false);
    //         console.log("Cancel Pressed");
    //       },
    //     },
    //     {
    //       text: "OK",
    //       onPress: () => {
    //         setScanned(false);
    //         ApiRequest(api, data);
    //       },
    //     },
    //   ],
    //   { cancelable: false }
    // );
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <BarCodeScanner
      onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
      style={StyleSheet.absoluteFillObject}
    />
  );
}
