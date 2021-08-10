import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBDQugPEqW28ZZpLh3AuoC8gJXdsl9p1Nk",
  authDomain: "facebook-clone-53250.firebaseapp.com",
  projectId: "facebook-clone-53250",
  storageBucket: "facebook-clone-53250.appspot.com",
  messagingSenderId: "229438098552",
  appId: "1:229438098552:web:bad5e37030411eeb75718d"
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };