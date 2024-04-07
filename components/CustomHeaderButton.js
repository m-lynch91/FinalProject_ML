/**
 * Encapsulates the header button component.
 */

import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const CustomHeaderButton = ({ title, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomHeaderButton;

const styles = StyleSheet.create({
  button: {
    padding: 10,
  },
  text: {
    color: "black",
  },
});
