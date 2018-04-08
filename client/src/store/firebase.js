import firebase from 'firebase'
const config = {
  apiKey: "AIzaSyBZmekjaKRVCAe9UOAv4g8pSHdxknckeSg",
  authDomain: "passwordmanager-29393.firebaseapp.com",
  databaseURL: "https://passwordmanager-29393.firebaseio.com",
  projectId: "passwordmanager-29393",
  storageBucket: "passwordmanager-29393.appspot.com",
  messagingSenderId: "942650714995"
};

const firebaseApp = firebase.initializeApp(config)
const db = firebaseApp.database()

export default db