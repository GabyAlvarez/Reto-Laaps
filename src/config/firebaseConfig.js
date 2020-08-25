
import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyCgpQik6oNKaHjCxKqNRy6z0VvbLPIbV94",
    authDomain: "laaps-dev.firebaseapp.com",
    databaseURL: "https://laaps-dev.firebaseio.com",
    projectId: "laaps-dev",
    storageBucket: "laaps-dev.appspot.com",
    messagingSenderId: "789482873480",
    appId: "1:789482873480:web:b6a15b0bc08c5a5ce3353d"
  };
  // Initialize Firebase
  firebase.initializeApp(config);

  export default firebase;

  /*

  export default {
    apiKey: "AIzaSyBIciSrJ345x0h96gWyzpJrYLz5ccrJ_8M",
    authDomain: "laaps-11b08.firebaseapp.com",
    databaseURL: "https://laaps-11b08.firebaseio.com",
    projectId: "laaps-11b08",
    storageBucket: "laaps-11b08.appspot.com",
    messagingSenderId: "250702350483",
    appId: "1:250702350483:web:5182a1b5a5e8525878e566"
  };*/