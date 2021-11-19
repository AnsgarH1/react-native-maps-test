import { API_URL } from "./constants";

const sendData = async (title: string, description: string) => {
  const data = { title: title, desc: description };
  const request: RequestInit = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  return fetch(API_URL, request);
};

const getData = async () => {
  console.log("loading data");
  //   const request: RequestInit = {
  //     method: "GET",
  //     headers: { "Content-Type": "application/json" },
  //   };

  return fetch(API_URL)
    .then((response) => {
      // console.log("response:", response);
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .catch((error) => {
      console.log("error", error);
      alert(
        "Fehler beim Abrufen der Daten! Es werden offline Mock-Daten verwendet. \n" +
          error
      );
    });
};

export { sendData, getData };
