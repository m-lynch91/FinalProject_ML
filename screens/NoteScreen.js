import React, { useState } from "react";
import {
  View,
  Button,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Modal,
} from "react-native";

import CustomHeaderButton from "../components/CustomHeaderButton";
import CustomNoteModalView from "../components/CustomNoteModalView";
import CustomAudioModalView from "../components/CustomAudioModalView";

import note from "../assets/sticky-note.png";
import add from "../assets/add.png";
import audio from "../assets/mic.png";

const NoteScreen = ({ navigation }) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <CustomHeaderButton
          title="Next"
          // onPress={() => navigation.navigate('ScreenThree', { screenTitle: 'Third Screen' })}
        />
      ),
    });
  }, [navigation]);

  const [textModalVisible, setTextModalVisible] = useState(false);
  const [audioModalVisible, setAudioModalVisible] = useState(false);

  const addTextOnPressHandler = () => {
    setTextModalVisible(true);
  };

  const addAudioOnPressHandler = () => {
    setAudioModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <Image source={note} />
      <View style={styles.addContainer}>
        <TouchableOpacity onPress={addTextOnPressHandler}>
          <Image source={add} />
        </TouchableOpacity>
        {textModalVisible ? (
          <CustomNoteModalView
            modalVisible={textModalVisible}
            setModalVisible={setTextModalVisible}
          />
        ) : null}
        <Text style={{ paddingLeft: 10, fontSize: 20 }}>Add Text Note</Text>
      </View>
      <View style={styles.addContainer}>
        <TouchableOpacity onPress={addAudioOnPressHandler}>
          <Image source={audio} />
        </TouchableOpacity>
        {audioModalVisible ? (
          <CustomAudioModalView
            modalVisible={audioModalVisible}
            setModalVisible={setAudioModalVisible}
          />
        ) : null}
        <Text style={{ paddingLeft: 10, fontSize: 20 }}>Add Audio Note</Text>
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
});
