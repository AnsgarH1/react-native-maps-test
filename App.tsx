import { NavigationContext } from "@react-navigation/core";
import { NavigationContainer } from "@react-navigation/native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useRef, useState } from "react";
import { FetchResult, View, Text } from "react-native";
import AddData from "./src/screens/AddData";
import Home from "./src/screens/Home";
import Map from "./src/screens/Map";
import { getData } from "./src/utility/api";
import { apiResult } from "./src/utility/types";

const Stack = createNativeStackNavigator();
export const ApiDataContext = React.createContext<Partial<apiResult>>({});

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
  const [apiData, setApiData] = useState({});
  useEffect(() => {
    const init = async () => {
      getData().then((data) => setApiData(data));
      // setApiData(data);
    };
    init();
  }, []);
  return (
    <ApiDataContext.Provider value={apiData}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Map" component={Map} />
          <Stack.Screen name="AddData" component={AddData} />
        </Stack.Navigator>
      </NavigationContainer>
    </ApiDataContext.Provider>
  );
}
