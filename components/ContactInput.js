/**
 * Encapsulates a contact input modal so that user can enter contacts into a list.
 */

import React, { useState } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from "react-native";

const ContactInput = (props) => {
  const [enteredContactName, setEnteredContactName] = useState();
  const [enteredContactInfo, setEnteredContactInfo] = useState();

  const contactInputNameHelper = (enteredContactName) => {
    setEnteredContactName(enteredContactName);
  };

  const contactInputInfoHelper = (enteredContactInfo) => {
    setEnteredContactInfo(enteredContactInfo);
  };

  const addContactHandler = () => {
    props.onAddItem(enteredContactName + ": " + enteredContactInfo);
    setEnteredContactName("");
    setEnteredContactInfo("");
  };

  return (
    <Modal animationType="slide" transparent={true} visible={props.visible}>
      <View style={styles.modalView}>
        <TextInput
          placeholder="Contact Name"
          style={styles.input}
          onChangeText={contactInputNameHelper}
          value={enteredContactName}
        />
        <TextInput
          placeholder="Contact Email Address"
          style={styles.input}
          onChangeText={contactInputInfoHelper}
          value={enteredContactInfo}
        />
        <View style={{ marginVertical: 10 }} />
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.close} onPress={props.onCancel}>
            <Text style={styles.textStyle}>Close</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.save} onPress={addContactHandler}>
            <Text style={styles.textStyle}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
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
  input: {
    width: "80%",
    borderColor: "black",
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "60%",
  },
  button: {
    width: "40%",
  },
});

export default ContactInput;
