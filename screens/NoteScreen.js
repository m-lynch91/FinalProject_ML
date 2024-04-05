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
import note from "../assets/sticky-note.png";
import add from "../assets/add.png";

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
    alert("Add button pressed");
  };

  return (
    <View style={styles.container}>
      <Image source={note} />
      <View style={styles.addContainer}>
        <TouchableOpacity onPress={addOnPressHandler}>
          <Image source={add} />
        </TouchableOpacity>
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
    marginTop: 40,
    paddingLeft: 35,
  },
});
