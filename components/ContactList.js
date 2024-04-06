/**
 * Encapsulates a contact list modal so that user can view and interact with a contacts list.
 */

import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const ContactList = (props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.75}
      onPress={props.onDelete.bind(this, props.id)} // pass id of this item to onDelete method
    >
      <View style={styles.contact}>
        <Text>{props.item}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  contact: {
    padding: 10,
    marginVertical: 2,
    borderColor: "black",
    borderWidth: 1,
  },
});

export default ContactList;
