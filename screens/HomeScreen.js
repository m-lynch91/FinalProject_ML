import React, { useState } from "react";
import { View, StyleSheet, Image, Button, Alert } from "react-native";
import { auth } from "../FirebaseConfig";
import { signOut } from "firebase/auth";

import CustomHeaderButton from "../components/CustomHeaderButton";
import note from "../assets/sticky-note128.png";

const HomeScreen = ({ navigation }) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
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

  const signoutWithFirebase = () => {
    signOut(auth).then(() => {
      Alert.alert("User was logged out!");
      navigation.navigate("RegisterScreen");
    });
  };
  return (
    <View style={styles.container}>
      <Image source={note} />
      <View style={{ paddingVertical: 20 }} />
      <Button title="Sign Out" onPress={signoutWithFirebase} color="#d9534f" />
    </View>
  );
};

export default HomeScreen;

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
