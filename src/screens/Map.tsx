import React, { useState, useEffect } from "react";
import { Platform, View, Text, StyleSheet, Dimensions } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

export default function Map({ locations }) {
  const apiData = locations;

  const [mapRegion, setMapRegion] = useState({
    latitude: 50.110924,
    longitude: 8.682127,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [location, setLocation] = useState({
    coords: { latitude: 50.110924, longitude: 8.682127 },
  });
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        //@ts-ignore
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      //@ts-ignore
      setLocation(location);
      setMapRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    })();
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (
    <View style={styles.container}>
      <MapView
        initialRegion={mapRegion}
        region={mapRegion}
        onRegionChange={setMapRegion}
        style={styles.map}
      >
        {location && (
          <Marker
            pinColor="blue"
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
          />
        )}
        {apiData.map((location) => (
          <Marker
            title={location.locationName}
            description={location.desc}
            coordinate={{
              latitude: location.coordLat,
              longitude: location.coordLong,
            }}
          />
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
