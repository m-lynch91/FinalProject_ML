import React, { useState } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from "react-native";

const CustomModalView = ({ modalVisible, setModalVisible }) => {
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.title}>Add Note</Text>
            <TextInput
              style={styles.modalTitle}
              placeholder="Note Title"
            ></TextInput>
            <TextInput
              style={styles.modalContent}
              placeholder="Note Content"
            ></TextInput>
            <TouchableOpacity
              style={styles.openButton}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <Text style={styles.textStyle}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CustomModalView;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 30,
    alignItems: "stretch",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    padding: 20,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    margin: 0,
    color: "black",
    fontWeight: "bold",
  },
  modalTitle: {
    margin: 10,
    paddingHorizontal: 50,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 5,
  },
  modalContent: {
    margin: 10,
    padding: 50,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    margin: 0,
    paddingTop: 5,
    paddingBottom: 10,
    alignSelf: "center",
  },
});
