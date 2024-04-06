import React, { useState } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from "react-native";

const CustomNoteModalView = ({ modalVisible, setModalVisible }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <View style={styles.modalView}>
        <Text style={styles.title}>Add Note</Text>
        <TextInput
          style={styles.modalTitle}
          placeholder="Note Title"
        ></TextInput>
        <View style={{ marginVertical: 10 }} />
        <TextInput
          style={styles.modalContent}
          placeholder="Note Content"
          multiline={true}
        ></TextInput>
        <View style={{ marginVertical: 10 }} />
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.close}
            onPress={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <Text style={styles.textStyle}>Close</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.save}
            onPress={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <Text style={styles.textStyle}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default CustomNoteModalView;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
  },
  modalView: {
    margin: 20,
    padding: 35,
    marginTop: 200,
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
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
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
    padding: 10,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 10,
  },
  modalContent: {
    padding: 10,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 20,
    height: 300,
    width: "100%",
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
