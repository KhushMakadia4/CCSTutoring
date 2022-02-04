import Firebase from 'firebase/app'
import 'firebase/auth'

// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyBRue3EyAi5sWEGjEDrusG5OkqmMOoaqTI",
//   authDomain: "ccstutoring-66299.firebaseapp.com",
//   projectId: "ccstutoring-66299",
//   storageBucket: "ccstutoring-66299.appspot.com",
//   messagingSenderId: "248585625832",
//   appId: "1:248585625832:web:f6786586b31a0d7ba4a95d",
//   measurementId: "G-DK1E6XB1ET"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: "ccstutoring-66299.appspot.com",
    messagingSenderId: "248585625832",
    appId: "1:248585625832:web:f6786586b31a0d7ba4a95d",
    measurementId: "G-DK1E6XB1ET"
  };

if (!Firebase.getApps.length()) {
    Firebase.initializeApp(firebaseConfig)
}