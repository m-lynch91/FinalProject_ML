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
import CustomModalView from "../components/CustomModalView";

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

  const [modalVisible, setModalVisible] = useState(false);

  const addOnPressHandler = () => {
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <Image source={note} />
      <View style={styles.addContainer}>
        <TouchableOpacity onPress={addOnPressHandler}>
          <Image source={add} />
        </TouchableOpacity>
        {modalVisible ? (
          <CustomModalView
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
          />
        ) : null}
        <Text style={{ paddingLeft: 10, fontSize: 20 }}>Add Text Note</Text>
      </View>
      <View style={styles.addContainer}>
        <TouchableOpacity onPress={addOnPressHandler}>
          <Image source={audio} />
        </TouchableOpacity>
        {modalVisible ? (
          <CustomModalView
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
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
