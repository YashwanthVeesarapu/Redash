import axios from "axios";

let dev = false;

// if (process.env.ENVIRONMENR === "development") {
//   // dev = true;
// }
export const serverURI = dev
  ? "http://localhost:4000/"
  : "https://api.mrredash.com/";

export const returnURL = dev
  ? "http://localhost:3000/checkout?s=2"
  : "https://www.mrredash.com/checkout?s=2";

export const microURL = dev
  ? "http://127.0.0.1:8000/"
  : "https://micro.redsols.us/";

export const url = serverURI;
export const apiInstance = axios.create({
  baseURL: url,
});
