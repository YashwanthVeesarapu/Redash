import axios from "axios";

let dev = false;
if (window.location.hostname === "localhost") {
  // dev = true;
}
export const serverURI = dev
  ? "http://localhost:4000/"
  : "https://api.redash.us/";

export const returnURL = dev
  ? "http://localhost:3000/checkout?s=2"
  : "https://redash.us/checkout?s=2";

export const microURL = dev
  ? "http://127.0.0.1:8000/"
  : "https://rmbg-owrbeic3ba-uk.a.run.app/";

export const url = serverURI;
export const apiInstance = axios.create({
  baseURL: url,
});
