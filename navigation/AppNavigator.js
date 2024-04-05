import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import NoteScreen from "../screens/NoteScreen";

const Stack = createNativeStackNavigator();

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="NoteScreen"
        screenOptions={{
          headerTintColor: "white",
          headerStyle: { backgroundColor: "#ffffff" },
          headerTitleStyle: { fontWeight: "bold", color: "black" },
          headerTitleAlign: "center",
        }}
      >
        <Stack.Screen
          name="NoteScreen"
          component={NoteScreen}
          options={{ title: "Note Screen" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
