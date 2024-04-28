import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCry2Gje0HvWIGWLSOejaBSLlEiLztTMDk",
    authDomain: "mern-netflix-clone-d82c0.firebaseapp.com",
    projectId: "mern-netflix-clone-d82c0",
    storageBucket: "mern-netflix-clone-d82c0.appspot.com",
    messagingSenderId: "651801021465",
    appId: "1:651801021465:web:833424656f89107735ae88"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);
export default app;