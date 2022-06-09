// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getAuth} from "firebase/auth";
import {getStorage} from "firebase/storage";
import thunk from "redux-thunk";
import { applyMiddleware, combineReducers, createStore } from "redux";
import magazine from "./modules/magazine";
import user from "./modules/user"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAUZHz2UAXJOo5p3oufPiuBFPQD1l67jkc",
  authDomain: "react-week5-6acfb.firebaseapp.com",
  projectId: "react-week5-6acfb",
  storageBucket: "react-week5-6acfb.appspot.com",
  messagingSenderId: "49204740083",
  appId: "1:49204740083:web:3087eb0c0c88c3661f1c86",
  measurementId: "G-MB2Q141N7N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


const middleware = [thunk];
const enhancer = applyMiddleware(...middleware);
const rootReducer = combineReducers({magazine,user});

export const store = createStore(rootReducer, enhancer)

export const auth = getAuth();
export const db = getFirestore(app);
export const storage = getStorage();



export default app;