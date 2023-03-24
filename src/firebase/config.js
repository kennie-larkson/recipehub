import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDZLYQ38hb-NyMEATOcqY83jVViaHtr9m0",
  authDomain: "recipe-hub-site.firebaseapp.com",
  projectId: "recipe-hub-site",
  storageBucket: "recipe-hub-site.appspot.com",
  messagingSenderId: "249077364352",
  appId: "1:249077364352:web:3bb28d3f00d18df9f8d865",
};

// init firebase
firebase.initializeApp(firebaseConfig);

//init service
const projectFirestore = firebase.firestore();

export { projectFirestore };
