import React, { useState, useRef } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
} from "react-native";

import { Audio } from "expo-av";
import { set } from "firebase/database";

const started = "Started";
const stopped = "Stopped";
const paused = "Paused";
const restarted = "Restarted";

const CustomAudioModalView = ({ modalVisible, setModalVisible }) => {
  // recording state
  const recording = useRef(null);
  const [recordingStatus, setRecordingStatus] = useState("");
  const [recordingExists, setRecordingExists] = useState(false);

  // playback state
  const soundObject = useRef(null);
  const [currentPosition, setCurrentPosition] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const verifyPermissions = async () => {
    const result = await Audio.requestPermissionsAsync();
    if (result.status !== "granted") {
      Alert.alert(
        "Insufficient Permissions!",
        "You need to grant audio recording permissions to use this app.",
        [{ text: "Okay" }]
      );
      return false;
    }
    return true;
  };

  // recording methods
  const startRecordingAudio = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }

    setRecordingStatus(started);
    setRecordingExists(false);

    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      playsInSilentModeIOS: true,
    });

    try {
      recording.current = new Audio.Recording();
      await recording.current.prepareToRecordAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      await recording.current.startAsync();
      console.log("Recording started!");
    } catch (error) {
      console.log("An error occurred while starting to record:");
      console.log(error);
    }
  };

  const stopRecordingAudio = async () => {
    try {
      await recording.current.stopAndUnloadAsync();
      console.log("Recording stopped!");

      // create new sound object after recording is stopped
      soundObject.current = new Audio.Sound();
      await soundObject.current.loadAsync({ uri: recording.current.getURI() });
    } catch (error) {
      console.log("An error occurred while stopping the recording:");
      console.log(error);
    }
    setRecordingStatus(stopped);
    setRecordingExists(true);
  };

  // playback methods
  const playRecordedAudio = async () => {
    if (!isPlaying) {
      soundObject.current = new Audio.Sound();
      await soundObject.current.loadAsync({ uri: recording.current.getURI() });

      try {
        const result = await soundObject.current.getStatusAsync();

        if (result.isLoaded) {
          setIsPlaying(true);
          setRecordingStatus(started);
          soundObject.current.playFromPositionAsync(currentPosition);
          setCurrentPosition(0);
        }

        soundObject.current.setOnPlaybackStatusUpdate((status) => {
          if (status.didJustFinish) {
            setRecordingStatus(stopped);
            setIsPlaying(false);
          }
        });

        await soundObject.current.playAsync();

        console.log("Playback started!");
      } catch (error) {
        console.log("An error occurred while trying to play the recording:");
        console.log(error);
        setRecordingStatus(stopped);
      }
    }
  };

  const pauseRecordedAudio = async () => {
    try {
      const result = await soundObject.current.getStatusAsync();

      if (result.isLoaded) {
        soundObject.current.pauseAsync();
        setCurrentPosition(result.positionMillis);
        setRecordingStatus(paused);
        setIsPlaying(false);
      }
    } catch (error) {}
  };

  const stopPlayingRecordedAudio = async () => {
    if (soundObject.current) {
      try {
        await soundObject.current.stopAsync();
        await soundObject.current.unloadAsync();
        soundObject.current = null;
        console.log("Playback stopped!");
        setRecordingStatus(stopped);
        setCurrentPosition(0);
        setIsPlaying(false);
      } catch (error) {
        console.log("An error occurred while stopping playback:");
        console.log(error);
      }
    }
  };

  const muteRecordedAudio = async () => {
    try {
      const result = await soundObject.current.getStatusAsync();
      if (result.isLoaded) {
        if (isMuted === true) {
          soundObject.current.setVolumeAsync(1.0);
          setIsMuted(false);
        }

        if (isMuted === false) {
          soundObject.current.setVolumeAsync(0.0);
          setIsMuted(true);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const restartRecordedAudio = async () => {
    try {
      const result = await soundObject.current.getStatusAsync();

      if (result.isLoaded) {
        soundObject.current.replayAsync();
        setRecordingStatus(restarted);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const clearRecordedAudio = async () => {
    await stopPlayingRecordedAudio();
    soundObject.current = null;

    setRecordingExists(false);
    console.log("Recording cleared!");
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <View style={styles.modalView}>
        <Text style={styles.title}>Record Note</Text>

        {!recordingExists ? (
          <View>
            <View>
              <Text style={styles.textUpdate}>Recording {recordingStatus}</Text>
            </View>
            <View style={{ marginVertical: 10 }}></View>
            <View style={styles.buttonContainer}>
              <Button
                title="Record"
                color="grey"
                onPress={startRecordingAudio}
              />
              <Button title="Stop" color="grey" onPress={stopRecordingAudio} />
            </View>
          </View>
        ) : (
          <View>
            <View>
              <Text style={styles.textUpdate}>Recording {recordingStatus}</Text>
            </View>
            <View style={{ marginVertical: 10 }}></View>
            <View style={styles.buttonContainer}>
              <Button title="Play" color="grey" onPress={playRecordedAudio} />
              <Button title="Pause" color="grey" onPress={pauseRecordedAudio} />
              <Button
                title="Stop"
                color="grey"
                onPress={stopPlayingRecordedAudio}
              />
              <Button
                title="Restart"
                color="grey"
                onPress={restartRecordedAudio}
              />
            </View>
            <View style={{ marginVertical: 10 }}></View>
            <View style={{ paddingHorizontal: 70 }}>
              <Button
                title="Clear Recording"
                color="orange"
                onPress={clearRecordedAudio}
              />
              <View style={{ marginVertical: 5 }}></View>

              <Button title="Mute" color="orange" onPress={muteRecordedAudio} />
            </View>
          </View>
        )}

        <View style={{ marginVertical: 10 }} />
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.close}
            onPress={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <Text style={styles.textStyle}>Close</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.save}
            onPress={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <Text style={styles.textStyle}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default CustomAudioModalView;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
  },
  modalView: {
    margin: 20,
    padding: 35,
    marginTop: 200,
    backgroundColor: "white",
    borderRadius: 30,
    alignItems: "stretch",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    margin: 0,
    color: "black",
    fontWeight: "bold",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    margin: 0,
    paddingTop: 5,
    paddingBottom: 10,
    alignSelf: "center",
  },
  audioButtons: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  textUpdate: {
    fontSize: 20,
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: "pink",
  },
});
