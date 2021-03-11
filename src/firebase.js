import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDNxd5aQfjTlNCr2_RwGaW9BUJEDGENPY8",
    authDomain: "todolist-acfda.firebaseapp.com",
    projectId: "todolist-acfda",
    storageBucket: "todolist-acfda.appspot.com",
    messagingSenderId: "9343675105",
    appId: "1:9343675105:web:a65e811b88536227fba5a0",
    measurementId: "G-2FHW6L4S5C"
  };

  firebase.initializeApp(firebaseConfig);

  export default firebase;