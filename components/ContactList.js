import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import * as Clipboard from "expo-clipboard";

const ContactList = (props) => {
  const { emails } = props.item;
  const [copiedText, setCopiedText] = useState("");

  if (!emails || emails.length === 0) {
    // If no emails are found, return null to not render anything for this contact
    return null;
  }

  const copyToClipboard = async (email) => {
    await Clipboard.setStringAsync(email);
  };

  return (
    <TouchableOpacity activeOpacity={0.75}>
      <View style={styles.contact}>
        {emails.map((emailData, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => copyToClipboard(emailData.email)}
          >
            <Text>{emailData.email}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  contact: {
    padding: 20,
    marginVertical: 5,
    borderColor: "black",
    borderWidth: 1,
  },
});

export default ContactList;
