import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyDgp6yAqP5AOI4GPmB56REpEOd6-4OB56k",
  authDomain: "dasoasmi-85991.firebaseapp.com",
  databaseURL: "https://dasoasmi-85991-default-rtdb.firebaseio.com",
  projectId: "dasoasmi-85991",
  storageBucket: "dasoasmi-85991.firebasestorage.app",
  messagingSenderId: "290586673180",
  appId: "1:290586673180:web:ff57db2f17fafd4f89dfd9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };