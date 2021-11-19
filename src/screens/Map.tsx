import React, { useState, useEffect, useContext, useRef } from "react";
import { Platform, View, Text, StyleSheet, Dimensions } from "react-native";
import MapView, { Camera, Marker } from "react-native-maps";
import * as Location from "expo-location";
import { ApiDataContext } from "../../App";
import { Button, Icon } from "react-native-elements";

export default function Map() {
  const apiData = useContext(ApiDataContext);

  const mapRef = useRef<MapView>(null);

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
        ref={mapRef}
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
        {apiData?.results?.map((adr) => (
          <Marker
            pinColor="red"
            coordinate={{ latitude: adr.valLat, longitude: adr.valLong }}
          />
        ))}
      </MapView>
      {location && (
        <View
          style={{
            position: "absolute",
            bottom: 100,
            right:10,
            height: 50,
            width: 50,
            borderRadius: 12,
            display: "flex",
            justifyContent: "center",
            backgroundColor: "white",
          }}
        >
          <Icon
            name="locate"
            type="ionicon"
            color="black"
            size={46}
            onPress={() => {
              mapRef.current?.animateCamera(
                {
                  center: {
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                  },
                },
                { duration: 500 }
              );
            }}
          />
        </View>
      )}
      {apiData && (
        <View
          style={{
            position: "absolute",
            bottom: 0,

            width: Dimensions.get("window").width,
          }}
        >
          <Button
            title="Go to Adress"
            style={{
              width: "80%",
              left: "10%",
              marginBottom: 24,
            }}
            onPress={() => {
              mapRef.current?.animateCamera(
                {
                  center: {
                    latitude: apiData.results[0].valLat,
                    longitude: apiData.results[0].valLong,
                  },
                },
                { duration: 500 }
              );
            }}
          />
        </View>
      )}
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
