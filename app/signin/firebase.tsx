'use server '
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAVViBkG7z7D5xQYi70xZPmeaDHxmI6RI0",
  authDomain: "dockapimanav.firebaseapp.com",
  projectId: "dockapimanav",
  storageBucket: "dockapimanav.appspot.com",
  messagingSenderId: "244678162088",
  appId: "1:244678162088:web:1a4434e5c08d6cdcb3749d",
  measurementId: "G-B0G6J06P60"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);
export { auth };