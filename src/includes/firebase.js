import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAalD61ZgCygeQO09E0eOW9GnP1xKA8Wo4',
  authDomain: 'vue-music-app-b3506.firebaseapp.com',
  projectId: 'vue-music-app-b3506',
  storageBucket: 'vue-music-app-b3506.appspot.com',
  appId: '1:435477291735:web:374d59948b6c91374d4692',
};

// Initialize Firebase
export default firebase.initializeApp(firebaseConfig);
