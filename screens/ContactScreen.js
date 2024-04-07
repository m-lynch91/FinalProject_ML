import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import * as Contacts from "expo-contacts";

import CustomHeaderButton from "../components/CustomHeaderButton";
import ContactList from "../components/ContactList";

import add from "../assets/add32.png";
import contact from "../assets/contact128.png";
import { set } from "firebase/database";

const ContactScreen = ({ navigation }) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <CustomHeaderButton
          title="Notes"
          onPress={() =>
            navigation.navigate("NoteScreen", {
              screenTitle: "NoteScreen",
            })
          }
        />
      ),
    });
  }, [navigation]);

  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === "granted") {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.Emails],
        });

        // add contacts to list
        setContactList(data);
      }
    })();
  }, []);

  const [contactList, setContactList] = useState([]);
  const [isAddMode, setIsAddMode] = useState(false);

  const addContactHandler = (contact) => {
    setContactList((contactList) => [
      ...contactList,
      { key: Math.random().toString(), value: contact },
    ]);
    setIsAddMode(false);
  };

  const removeContactHandler = (contactId) => {
    setContactList((contactList) => {
      return contactList.filter((contact) => contact.key !== contactId);
    });
  };

  return (
    <View style={styles.container}>
      <Image source={contact} />
      <View style={styles.addContainer}>
        <Text style={{ fontSize: 15 }}>
          Press to copy contact email to clipboard!
        </Text>
      </View>
      <View style={styles.listContainer}>
        <FlatList
          data={contactList}
          renderItem={(contactData) => (
            <ContactList
              id={contactData.item.key}
              onDelete={removeContactHandler}
              item={contactData.item}
            />
          )}
        />
      </View>
    </View>
  );
};

export default ContactScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#ffe5b3",
  },

  listContainer: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 20,
    width: "100%",
  },
});
