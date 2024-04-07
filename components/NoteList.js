import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from "react-native";

const NoteList = (props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.75}
      onPress={() => {
        props.onEmail(props.item.title, props.item.body);
      }}
    >
      <View style={styles.item}>
        <ScrollView style={{ flex: 1 }}>
          <Text style={styles.text}>{props.item.title}</Text>
          <Text style={styles.text}>{props.item.body}</Text>
        </ScrollView>
        <TouchableOpacity
          activeOpacity={0.75}
          onPress={() => {
            props.onDelete.bind(this, props.id);
          }}
        >
          <Image
            source={require("../assets/remove32.png")}
            style={styles.image}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    marginVertical: 2,
    borderColor: "black",
    borderWidth: 1,
  },
  text: {
    fontSize: 14,
    marginRight: 10,
    margin: 5,
  },
  image: {
    marginLeft: 0,
    marginTop: 10,
  },
});

export default NoteList;
