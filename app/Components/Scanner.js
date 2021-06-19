import React, { useState } from "react";
import {
  Text,
  StyleSheet,
  Alert,
  Vibration,
  View,
  Dimensions,
  ToastAndroid,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { BarCodeScanner } from "expo-barcode-scanner";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BarcodeMask from "react-native-barcode-mask";

import ApiRequest from "./../api/request";
import CodeManualInput from "./Shared/CodeManualInput";
import PopupModal from "./PopupModal";

const { width } = Dimensions.get("screen");

export default function Scanner({ navigation: { navigate } }) {
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

  useFocusEffect(
    React.useCallback(() => {
      (async () => {
        setScanned(false);
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === "granted");

        const recordedApi = await AsyncStorage.getItem("api");
        recordedApi ? setApi(recordedApi) : setApi("");

        const recordedPassword = await AsyncStorage.getItem("pass");
        recordedPassword ? setPassword(recordedPassword) : setPassword("");
      })();
    }, [])
  );

  const handleBarCodeScanned = ({ type, data }) => {
    Vibration.vibrate(30);
    setCode(data);
    let postbody = {
      pss: password,
      Cd: data,
    };
    postbody = JSON.stringify(postbody);
    setScanned(true); //stop scanning
    if (!api) {
      Alert.alert(
        "NO API FOUND",
        "",
        [
          {
            text: "Go To Settings",
            onPress: () => {
              setScanned(false); //start scanning
              navigate("Settings");
            },
          },
        ],
        { cancelable: false }
      );
    } else {
      if (!password) {
        Alert.alert(
          "NO PASSWORD FOUND",
          "",
          [
            {
              text: "Go To Settings",
              onPress: () => {
                setScanned(false);
                navigate("Settings");
              },
            },
          ],
          { cancelable: false }
        );
      } else {
        ApiRequest(api, postbody)
          .then((res) => {
            if (res.data) {
              setItm(res.data.Itm);
              setUnt(res.data.Unt);
              setPrc(res.data.Prc);
              setQty(res.data.Qty);
            }
            setScanned(false);
            setModalVisible(true);
          })
          .catch((err) => {
            setTimeout(() => {
              Platform.OS === "ios"
                ? Alert.alert("Connection Error", ``)
                : ToastAndroid.show("Connection Error!", ToastAndroid.SHORT);
              setScanned(false);
            }, 500);
          });
      }
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={styles.mainContainer}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={[StyleSheet.absoluteFill, styles.container]}
      >
        <Text style={styles.description}>Scan your code</Text>
        <BarcodeMask
          width={300}
          height={500}
          outerMaskOpacity={0.8}
          edgeRadius={5}
          edgeBorderWidth={5}
          edgeColor={"white"}
          edgeHeight={20}
          showAnimatedLine={false}
        />
        <CodeManualInput
          code={code}
          setCode={(x) => setCode(x)}
          handleBarCodeScanned={(x, y) => handleBarCodeScanned(x, y)}
        />
      </BarCodeScanner>

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
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-end",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ecf0f1",
  },

  description: {
    fontSize: width * 0.09,
    textAlign: "center",
    width: "70%",
    color: "white",
    position: "absolute",
    top: 25,
  },
});
