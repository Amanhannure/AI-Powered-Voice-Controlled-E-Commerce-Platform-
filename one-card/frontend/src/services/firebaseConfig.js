
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  // ...other values from Firebase (copy & paste them all)
};

export const firebaseApp = initializeApp(firebaseConfig);
