import React, { useContext, useEffect, useState } from "react";
import { View, Text, Button } from "react-native";
import { ApiDataContext } from "../../App";
import { getData } from "../utility/api";

//@ts-ignore
export default function Home({ navigation }) {
  const apiData = useContext(ApiDataContext);

  return (
    <View>
      <Text>Home Screen</Text>
      <Button title="go to Map" onPress={() => navigation.navigate("Map")} />
      <Button
        title="create some Data"
        onPress={() => navigation.navigate("AddData")}
      />
      <View>
        <Text>{apiData ? "Daten geladen!" : "Daten werden geladen.."}</Text>
        <Text>{JSON.stringify(apiData)}</Text>
      </View>
    </View>
  );
}
