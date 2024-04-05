import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  Button,
  Alert,
  StyleSheet,
  ScrollView,
} from "react-native";
import { db, firestore, auth } from "../FirebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { ref, get, set } from "firebase/database";

const RegisterScreen = ({ navigation }) => {
  const [isRegistering, setIsRegistering] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [databaseData, setDatabaseData] = useState("");

  const handleAuth = () => {
    const action = isRegistering
      ? createUserWithEmailAndPassword
      : signInWithEmailAndPassword;

    action(auth, email, password)
      .then(() => {
        Alert.alert(isRegistering ? "User registered!" : "User logged in!");
        if (isRegistering) {
          setIsRegistering(false);
          setEmail("");
          setPassword("");
        } else {
          setLoggedIn(true);
          setEmail("");
          setPassword("");
          navigation.navigate("NoteScreen");
        }
      })
      .catch((error) => {
        Alert.alert(error.message);
        console.log(error);
      });
  };

  const signoutWithFirebase = () => {
    signOut(auth).then(() => {
      Alert.alert("User was logged out!");
      setLoggedIn(false);
    });
  };

  const saveDataWithFirebase = async () => {
    const userId = auth.currentUser.uid;

    // SAVE DATA TO REALTIME DB
    const dbRef = ref(db, "users/" + userId);
    await set(dbRef, { text: databaseData });

    // SAVE DATA TO FIRESTORE
    const firestoreDoc = doc(firestore, "users", userId);
    await setDoc(firestoreDoc, { text: databaseData }, { merge: true });
  };

  const retrieveDataFromFirebase = async () => {
    const userId = auth.currentUser.uid;

    // LOAD DATA FROM FIRESTORE
    const firestoreDoc = doc(firestore, "users", userId);
    const docSnap = await getDoc(firestoreDoc);
    if (docSnap.exists()) {
      setDatabaseData(docSnap.data().text);
    } else {
      console.log("No such document!");
    }

    // LOAD DATA FROM REALTIME DATABASE
    // const dbRef = ref(db, 'users/' + userId);
    // const snapshot = await get(dbRef);
    // if (snapshot.exists()) {
    //   setDatabaseData(snapshot.val().text);
    // } else {
    //   console.log("No such document in Realtime Database!");
    // }
  };

  return (
    <ScrollView style={styles.container}>
      {/* {!loggedIn ? ( */}
      <View style={styles.authContainer}>
        <Text style={styles.title}>{isRegistering ? "Register" : "Login"}</Text>
        <TextInput
          style={styles.textInput}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
          placeholder="Email"
        />
        <TextInput
          style={styles.textInput}
          value={password}
          onChangeText={setPassword}
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry
          placeholder="Password"
        />
        <View style={{ marginVertical: 10 }}></View>
        <Button
          title={isRegistering ? "Register" : "Login"}
          onPress={handleAuth}
        />
        <View style={{ marginVertical: 10 }}></View>
        <Button
          title={isRegistering ? "Switch to Login" : "Switch to Register"}
          onPress={() => setIsRegistering(!isRegistering)}
          color="#1e90ff"
        />
      </View>
    </ScrollView>
    // ) : (
    //   <View style={styles.dataContainer}>
    //     <TextInput
    //       style={styles.textArea}
    //       multiline
    //       numberOfLines={4}
    //       onChangeText={setDatabaseData}
    //       value={databaseData}
    //       placeholder="Enter some text"
    //     />
    //     <View style={styles.buttonContainer}>
    //       <Button title="Save Data" onPress={saveDataWithFirebase} />
    //       <Button title="Load Data" onPress={retrieveDataFromFirebase} />
    //     </View>
    //     <Button
    //       title="Sign Out"
    //       onPress={signoutWithFirebase}
    //       color="#d9534f"
    //     />
    //   </View>
    // )}
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffe5b3",
  },
  authContainer: {
    padding: 20,
    marginTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  textInput: {
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
    backgroundColor: "white",
  },
  textArea: {
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
    minHeight: 100,
    textAlignVertical: "top",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  dataContainer: {
    padding: 20,
    marginTop: 50,
  },
});
