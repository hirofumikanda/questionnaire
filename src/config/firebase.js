import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBlX2BKfC13olS8JQHU11rl7T4M1muK54c",
    authDomain: "questionnaire-19ac2.firebaseapp.com",
    projectId: "questionnaire-19ac2",
    storageBucket: "questionnaire-19ac2.appspot.com",
    messagingSenderId: "380107451875",
    appId: "1:380107451875:web:2a45bdec33d38a157b04d6",
    measurementId: "G-40GDB84PRD"
};

export const app = initializeApp(firebaseConfig);

export const database = getFirestore(app);