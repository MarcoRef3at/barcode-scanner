import React, { useState } from "react";
import {
  Button,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import ApiRequest from "./../api/request";

const PopupModal = ({
  modalVisible,
  setModalVisible,
  code,
  name,
  unit,
  price,
  quantity,
  password,
  api,
}) => {
  const [selectedUnit, setSelectedUnit] = useState(unit[0]);
  const [selectedQuantity, setSelectedQuantity] = useState(parseInt(quantity));
  let items = unit.map((s, i) => {
    return <Picker.Item key={i} value={s} label={s} />;
  });

  const submitRequest = () => {
    let postbody = {
      pss: password,
      Unt: selectedUnit,
      Qty: selectedQuantity,
    };
    postbody = JSON.stringify(postbody);
    ApiRequest(api, postbody).then((res) => {
      console.log("res:", res.data);
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
        <Text style={styles.modalText}>Code : {code}</Text>
        <Text style={styles.modalText}>Name : {name}</Text>
        <Text style={styles.modalText}>Price : {price}</Text>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={styles.modalText}>Quantity : {selectedQuantity}</Text>
          <Button
            title="+"
            onPress={() => setSelectedQuantity(selectedQuantity + 1)}
            style={{}}
          />
          <Button
            title="-"
            onPress={() => setSelectedQuantity(selectedQuantity - 1)}
          />
        </View>
        <Picker
          style={{ width: 200, height: 44 }}
          itemStyle={{ height: 44 }}
          selectedValue={selectedUnit}
          onValueChange={(itemValue, itemIndex) => setSelectedUnit(itemValue)}
        >
          {items}
        </Picker>

        <TouchableHighlight
          style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
          onPress={() => submitRequest()}
        >
          <Text style={styles.textStyle}>Save</Text>
        </TouchableHighlight>
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
    position: "absolute",
    top: "30%",
    left: "30%",
    right: "30%",

    margin: -40,
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
