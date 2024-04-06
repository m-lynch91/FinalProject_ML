import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";

import CustomHeaderButton from "../components/CustomHeaderButton";
import ContactInput from "../components/ContactInput";
import ContactList from "../components/ContactList";

import add from "../assets/add32.png";
import contact from "../assets/contact128.png";

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
        <TouchableOpacity onPress={() => setIsAddMode(true)}>
          <Image source={add} />
        </TouchableOpacity>
        <ContactInput
          visible={isAddMode}
          onCancel={() => setIsAddMode(false)}
          onAddItem={addContactHandler}
        />
        <Text style={{ paddingLeft: 10, fontSize: 20 }}>Add Contact</Text>
      </View>
      <View style={styles.listContainer}>
        <FlatList
          data={contactList}
          renderItem={(contactData) => (
            <ContactList
              id={contactData.item.key}
              onDelete={removeContactHandler}
              item={contactData.item.value}
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
  addContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignSelf: "flex-start",
    alignItems: "center",
    marginTop: 40,
    paddingLeft: 35,
  },
  listContainer: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 20,
    width: "100%",
  },
});
