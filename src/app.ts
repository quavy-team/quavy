import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";

const app = getApps().length
  ? getApp()
  : initializeApp({
      projectId: "songly-app",
      apiKey: "AIzaSyCX7S0DI914qrmCz77IRqVZj-AcSB5sdI4",
      authDomain: "songly-app.firebaseapp.com",
      storageBucket: "songly-app.appspot.com",
      messagingSenderId: "458151422818",
      appId: "1:458151422818:web:89cc96f51e90d2afa21a3b",
      measurementId: "G-Y6FLDCFD8E",
    });

const auth = getAuth(app);
const store = getFirestore(app);

export default app;
export { auth, store };
