import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDX-d2E-UkGlHP8XQ_VCkoBmNaMjeOld9E",
  authDomain: "books-2293f.firebaseapp.com",
  databaseURL: "https://books-2293f.firebaseio.com",
  projectId: "books-2293f",
  storageBucket: "books-2293f.appspot.com",
  messagingSenderId: "401377237084",
  appId: "1:401377237084:web:c427fb8fab82fdb32d6e99"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
