// src/server/firebase.js

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getDatabase } from 'firebase/database';
import { getAnalytics, isSupported } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyDzwhupsUA7w3I8B0F2t6CYBGNwmOLD3OM",
  authDomain: "slack-project-fe66c.firebaseapp.com",
  databaseURL: "https://slack-project-fe66c-default-rtdb.firebaseio.com",
  projectId: "slack-project-fe66c",
  storageBucket: "slack-project-fe66c.appspot.com",
  messagingSenderId: "1008561675504",
  appId: "1:1008561675504:web:4d240a2d7999a9a5723635",
  measurementId: "G-6B7P3VDFW8"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);
const database = getDatabase(app);

// Initialize Firebase Analytics and check if it is supported
isSupported().then(supported => {
  if (supported) {
    const analytics = getAnalytics(app);
  } else {
    console.warn('Firebase Analytics is not supported on this environment.');
  }
});

export { auth, storage, database, app };
