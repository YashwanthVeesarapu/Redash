import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";

import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDLk3ls_0Jo673TrDy5JrOmxTLikUu2OyE",
  authDomain: "redashnyc.firebaseapp.com",
  projectId: "redashnyc",
  storageBucket: "redashnyc.appspot.com",
  messagingSenderId: "747288470358",
  appId: "1:747288470358:web:af2fed6757e217206b2cf7",
  measurementId: "G-BDRY1MY115",
};

export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
