/**
 * Encapsulates the NoteScreen component
 */

import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
} from "react-native";
import { firestore, auth } from "../FirebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import * as Clipboard from "expo-clipboard";
import * as MailComposer from "expo-mail-composer";

import CustomHeaderButton from "../components/CustomHeaderButton";
import CustomNoteModalView from "../components/CustomNoteModalView";
import CustomAudioModalView from "../components/CustomAudioModalView";
import NoteList from "../components/NoteList";

import note from "../assets/sticky-note128.png";
import add from "../assets/add32.png";
import audio from "../assets/mic.png";

const NoteScreen = ({ navigation }) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <CustomHeaderButton
          title="Contacts"
          onPress={() =>
            navigation.navigate("ContactScreen", {
              screenTitle: "ContactScreen",
            })
          }
        />
      ),
      headerLeft: () => (
        <CustomHeaderButton
          title="Home"
          onPress={() =>
            navigation.navigate("HomeScreen", {
              screenTitle: "HomeScreen",
            })
          }
        />
      ),
    });

    retrieveDataFromFirebase();
  }, [navigation]);

  const [textModalVisible, setTextModalVisible] = useState(false);
  const [audioModalVisible, setAudioModalVisible] = useState(false);
  const [noteList, setNoteList] = useState([]);

  const retrieveDataFromFirebase = async () => {
    const userId = auth.currentUser.uid;

    // LOAD DATA FROM FIRESTORE
    const textDoc = doc(firestore, "textNotes", userId);
    const textDocSnap = await getDoc(textDoc);

    const audioDoc = doc(firestore, "audioNotes", userId);
    const audioDocSnap = await getDoc(audioDoc);

    // Update noteList array with a new object appended to it
    if (textDocSnap.exists()) {
      setNoteList((prevNoteList) => [
        ...prevNoteList,
        {
          key: Math.random().toString(),
          title: textDocSnap.data().title,
          body: textDocSnap.data().body,
        },
      ]);
    }

    if (audioDocSnap.exists()) {
      setNoteList((prevNoteList) => [
        ...prevNoteList,
        {
          key: Math.random().toString(),
          title: audioDocSnap.data().title,
          body: audioDocSnap.data().uri,
        },
      ]);
    } else {
      console.log("No such document!");
    }
  };

  const removeNoteHandler = (noteId) => {
    setNoteList((noteList) => {
      return noteList.filter((note) => note.key !== noteId);
    });
  };

  const sendMessageWithEmail = async (title, body) => {
    const isAvailable = await MailComposer.isAvailableAsync();

    const email = await Clipboard.getStringAsync();
    console.log(email);

    if (isAvailable) {
      const options = {
        recipients: [email],
        subject: "Here's my note!",
        body: `Title: ${title}\n\n${body}\n\n${email}`,
      };

      MailComposer.composeAsync(options).then((result) =>
        console.log(result.status)
      );
    } else {
      console.log("Email is not available on this device");
    }
  };

  return (
    <View style={styles.container}>
      <Image source={note} />
      <View style={styles.addContainer}>
        <TouchableOpacity onPress={() => setTextModalVisible(true)}>
          <Image source={add} />
        </TouchableOpacity>
        {textModalVisible ? (
          <CustomNoteModalView
            modalVisible={textModalVisible}
            setModalVisible={setTextModalVisible}
            retrieveDataFromFirebase={retrieveDataFromFirebase}
          />
        ) : null}
        <Text style={{ paddingLeft: 10, fontSize: 20 }}>Add Text Note</Text>
      </View>
      <View style={styles.addContainer}>
        <TouchableOpacity onPress={() => setAudioModalVisible(true)}>
          <Image source={audio} />
        </TouchableOpacity>
        {audioModalVisible ? (
          <CustomAudioModalView
            modalVisible={audioModalVisible}
            setModalVisible={setAudioModalVisible}
            retrieveDataFromFirebase={retrieveDataFromFirebase}
          />
        ) : null}
        <Text style={{ paddingLeft: 10, fontSize: 20 }}>Add Audio Note</Text>
      </View>
      <View style={styles.listContainer}>
        <FlatList
          data={noteList}
          renderItem={(noteData) => (
            <NoteList
              id={noteData.item.key}
              item={noteData.item}
              onDelete={removeNoteHandler}
              onEmail={sendMessageWithEmail}
            />
          )}
        />
      </View>
    </View>
  );
};

export default NoteScreen;

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
