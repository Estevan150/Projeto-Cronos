import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBb58NL1yF2Ecr1ungBLU27EB6Hq16WKFg",
  authDomain: "cronos-4228f.firebaseapp.com",
  projectId: "cronos-4228f",
  storageBucket: "cronos-4228f.firebasestorage.app",
  messagingSenderId: "922464365067",
  appId: "1:922464365067:web:c9c26247b2bd506b5bf50e",
  measurementId: "G-DFSJ8KS50Z"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);