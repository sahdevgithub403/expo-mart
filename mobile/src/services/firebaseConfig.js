import { initializeApp, getApps, getApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence, getAuth } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyD.....",
  authDomain: "trustmart-d15ec.firebaseapp.com",
  projectId: "trustmart-d15ec",
  storageBucket: "trustmart-d15ec.appspot.com",
  messagingSenderId: "9XXXXXXXXX",
  appId: "1:9XXXXXXXXX:web:XXXX"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

let auth;

try {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
} catch (e) {
  auth = getAuth(app); 
}

export { auth, app };
export default app;
