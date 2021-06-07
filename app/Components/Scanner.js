import React, { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  Alert,
  Vibration,
  Modal,
  View,
  TextInput,
  TouchableHighlight,
} from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ApiRequest from "./../api/request";
import PopupModal from "./PopupModal";
export default function Scanner() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [api, setApi] = useState("");
  const [password, setPassword] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const [code, setCode] = useState(null);
  const [itm, setItm] = useState("");
  const [unt, setUnt] = useState([]);
  const [prc, setPrc] = useState(0);
  const [qty, setQty] = useState(0);

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
    Vibration.vibrate(30);
    setCode(data);
    let postbody = {
      pss: password,
      Cd: data,
    };
    postbody = JSON.stringify(postbody);
    setScanned(true);
    ApiRequest(api, postbody).then((res) => {
      console.log("res:", res.data);
      setItm(res.data.Itm);
      setUnt(res.data.Unt);
      setPrc(res.data.Prc);
      setQty(res.data.Qty);
      setScanned(false);
      setModalVisible(true);
    });
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      <PopupModal
        modalVisible={modalVisible}
        setModalVisible={(x) => setModalVisible(x)}
        code={code}
        name={itm}
        quantity={qty}
        price={prc}
        unit={unt}
        password={password}
        api={api}
      />
    </>
  );
}
