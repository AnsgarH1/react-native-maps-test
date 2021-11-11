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
  //   const request: RequestInit = {
  //     method: "GET",
  //     headers: { "Content-Type": "application/json" },
  //   };

  return fetch(API_URL);
};

export { sendData, getData };
