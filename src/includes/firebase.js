import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyAalD61ZgCygeQO09E0eOW9GnP1xKA8Wo4',
  authDomain: 'vue-music-app-b3506.firebaseapp.com',
  projectId: 'vue-music-app-b3506',
  storageBucket: 'vue-music-app-b3506.appspot.com',
  appId: '1:435477291735:web:374d59948b6c91374d4692',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

db.enablePersistence().catch((error) => {
  console.log(`Firebase persistance error ${error.code}`);
});

const usersCollection = db.collection('users');
const songsCollection = db.collection('songs');
const commentsCollection = db.collection('comments');

export {
  auth,
  db,
  usersCollection,
  songsCollection,
  commentsCollection,
  storage,
};
