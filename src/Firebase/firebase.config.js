
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyBn4e-NWGhDavZhAmAifPZEOnidj_jfRxI",
    authDomain: "fire2-402d5.firebaseapp.com",
    projectId: "fire2-402d5",
    storageBucket: "fire2-402d5.appspot.com",
    messagingSenderId: "628585776396",
    appId: "1:628585776396:web:75ec8b55583241430df529"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;