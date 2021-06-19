import React, { useState } from "react";
import { Modal, StyleSheet, TextInput, ToastAndroid, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import ApiRequest from "./../api/request";
import AppText from "./Shared/Text";
import AppButton from "./Shared/Button";
import RoundButton from "./Shared/RoundButton";

const PopupModal = ({
  modalVisible,
  setModalVisible,
  code = "No Code",
  name = "No Name",
  unit = [],
  price = -1,
  quantity = "0",
  password,
  api,
}) => {
  const [selectedUnit, setSelectedUnit] = useState(unit[0]);
  const [selectedQuantity, setSelectedQuantity] = useState(quantity);
  let disabled = selectedQuantity <= 0;
  let unitItems = unit.map((s, i) => {
    return <Picker.Item key={i} value={s} label={s} />;
  });

  const submitRequest = () => {
    let postbody = {
      pss: password,
      Unt: selectedUnit,
      Qty: selectedQuantity,
    };
    postbody = JSON.stringify(postbody);
    ApiRequest(api, postbody)
      .then((res) => {
        setModalVisible(false);
      })
      .catch((err) => {
        setTimeout(() => {
          Platform.OS === "ios"
            ? Alert.alert("Connection Error", ``)
            : ToastAndroid.show("Connection Error!", ToastAndroid.SHORT);
        }, 500);
        setModalVisible(false);
      });
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
      }}
    >
      <View style={styles.modalView}>
        <AppText style={styles.modalText}>Code : {code}</AppText>
        <AppText style={styles.modalText}>Name : {name}</AppText>
        <AppText style={styles.modalText}>Price : {price}</AppText>

        <AppText style={[styles.modalText]}>Quantity : </AppText>
        <View style={styles.counter}>
          <RoundButton
            icon="minus-circle"
            disabled={disabled}
            onPress={() => {
              setSelectedQuantity(
                selectedQuantity > 0 ? selectedQuantity - 1 : 0
              );
            }}
          />

          <TextInput
            style={styles.counterValue}
            value={selectedQuantity ? selectedQuantity.toString() : ""}
            onChangeText={(x) =>
              typeof x == "string"
                ? setSelectedQuantity(parseInt(x))
                : setSelectedQuantity(x)
            }
            keyboardType={"number-pad"}
            maxLength={3}
            onBlur={() => !selectedQuantity && setSelectedQuantity(0)}
          />

          <RoundButton
            icon="plus-circle"
            onPress={() => setSelectedQuantity(selectedQuantity + 1)}
          />
        </View>
        <AppText style={[styles.modalText]}>Unit : </AppText>
        <View style={styles.picker}>
          <Picker
            style={{
              width: 200,
              height: 44,
            }}
            itemStyle={{ height: 44 }}
            selectedValue={selectedUnit}
            onValueChange={(itemValue, itemIndex) => setSelectedUnit(itemValue)}
          >
            {unitItems}
          </Picker>
        </View>

        <AppButton title="Save" onPress={() => submitRequest()} />
        <AppButton
          title="Cancel"
          onPress={() => setModalVisible(false)}
          style={{ backgroundColor: "lightgrey" }}
        />
      </View>
    </Modal>
  );
};

export default PopupModal;

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
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: "10%",
    left: "15%",
    right: "15%",
    bottom: "20%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,

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
  counter: {
    flexDirection: "row",
    alignSelf: "center",
    padding: 10,
  },
  counterValue: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    marginHorizontal: 10,
    fontSize: 18,
    borderWidth: 2,
    borderColor: "#003f88",
    borderRadius: 20,
  },
  picker: {
    borderWidth: 2,
    borderColor: "#003f88",
    borderRadius: 20,
  },
});
