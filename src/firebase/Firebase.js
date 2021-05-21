import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyCCkkfAM70R7AejOyo0Yeu7u2LlJwZc0xo',
  authDomain: "cs-544-final-project.firebaseapp.com",
  databaseURL: "https://cs-544-final-project.firebaseio.com/",
  projectId: "cs-544-final-project",
  storageBucket: "cs-544-final-project.appspot.com",
  messagingSenderId: "197044967953",
  appId: "1:197044967953:web:0e6663b363779b2539afb0"
});

export default firebaseApp;
