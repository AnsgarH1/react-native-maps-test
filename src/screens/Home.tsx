import React from "react";
import { View, Text, Button } from "react-native";

export default function Home({ navigation }) {
  return (
      
    <View>
      <Text>Home Screen</Text>
      <Button title="go to Map" onPress={() => navigation.navigate("Map")} />
      <Text>This site does absolutely nothing and implementing React Routing was a waste of time.</Text>
    </View>
  );
}
