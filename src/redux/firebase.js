import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyD0JePL-Y8BvXvr1_QPCzhySWFAJYFl2Cw",
    authDomain: "chatbot-fc1e9.firebaseapp.com",
    projectId: "chatbot-fc1e9",
    storageBucket: "chatbot-fc1e9.appspot.com",
    messagingSenderId: "329532410815",
    appId: "1:329532410815:web:472a125f81dab150d2af0a",
    measurementId: "G-G1K70ETJFH"
  };

const firebaseApp = initializeApp(firebaseConfig);
const database = getDatabase(firebaseApp);

export { database };
