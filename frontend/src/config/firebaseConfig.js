import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
const firebaseConfig = {
  apiKey: `${process.env.REACT_APP_FIREBASE_API_KEY}`,
  authDomain: "voosh-assignment-402715.firebaseapp.com",
  projectId: "voosh-assignment-402715",
  storageBucket: "voosh-assignment-402715.appspot.com",
  messagingSenderId: "231549430628",
  appId: "1:231549430628:web:7def29e20dafbdd3836871",
  measurementId: "G-6RS89GJ0J0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
