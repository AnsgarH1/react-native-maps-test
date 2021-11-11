import { NavigationContext } from "@react-navigation/core";
import { NavigationContainer } from "@react-navigation/native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import AddData from "./src/screens/AddData";
import Home from "./src/screens/Home";
import Map from "./src/screens/Map";
import { getData } from "./src/utility/api";
import { API_URL } from "./src/utility/constants";
import { offer } from "./src/utility/types";

const Stack = createNativeStackNavigator();

// Some Mock-Data
const locations = [
  {
    coordLat: 50.079024,
    coordLong: 8.229947,
    locationName: "Verona-Pizzeria offline",
    desc: " Studentenangebot: Pizza für 6,90€ incl. 0,33l Softdrink",
  },
  {
    coordLat: 50.071789,
    coordLong: 8.233186,
    locationName: "Trattoria di Balbi offline",
    desc: " Schülerangebot: jede Pizza für 6€",
  },
];

export default function App() {
  const [apiData, setApiData] = useState<Array<offer>>(locations);
  useEffect(() => {
    getData()
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then((data) => setApiData(data))
      .catch((error) => {
        alert(
          "Fehler beim Abrufen der Daten! Es werden offline Mock-Daten verwendet. \n" +
            error
        );
      });
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Map" component={Map} />
        <Stack.Screen name="AddData" component={AddData} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
