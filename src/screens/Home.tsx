import React from "react";
import { View, Text, Button } from "react-native";

export default function Home({ navigation }) {
  return (
      
    <View>
      <Text>Home Screen</Text>
      <Button title="go to Map" onPress={() => navigation.navigate("Map")} />
      <Button title="create some Data" onPress={()=> navigation.navigate("AddData")} />
    </View>
  );
}
