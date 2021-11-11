import React, { useState } from "react";
import { TextInput, View, Text } from "react-native";
import { Button } from "react-native-elements";
import { Input } from "react-native-elements/dist/input/Input";
import { SafeAreaView } from "react-native-safe-area-context";
import { sendData } from "../utility/api";

function AddData() {
  const [isLoading, setLoading] = useState<boolean>(false);

  const [label, setLabel] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  return (
    <SafeAreaView style={{ padding: 8 }}>
      <Input
        label="Titel"
        onChangeText={setLabel}
        errorMessage="mehr als 3 Zeichen benötigt"
        renderErrorMessage={label.length < 3}
        errorStyle={{ color: "red" }}
      />
      <Input
        label="Beschreibung"
        onChangeText={setDescription}
        errorMessage="mehr als 5 Zeichen benötigt"
        errorStyle={{ color: "red" }}
        renderErrorMessage={label.length < 3}
      />

      <Button
        title="Sende"
        disabled={label.length < 3 || description.length < 5}
        onPress={() => {
          setLoading(true);
          sendData(label, description)
            .then((response) => {
              if (response.ok) {
                alert("Daten erfolgreich gesendet!");
              } else {
                alert("Es gabe einen Fehler!\n" + response.statusText);
              }
            })
            .finally(() => setLoading(false));
        }}
        loading={isLoading}
      />
    </SafeAreaView>
  );
}

export default AddData;
