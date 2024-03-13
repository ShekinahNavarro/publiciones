// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, onSnapshot, getDoc, updateDoc, doc } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
/*
const firebaseConfig = {
  apiKey: "AIzaSyDOT1pGJQd1G-6Qusm7chIW6X3PcdixH0k",
  authDomain: "publicaciones-d140c.firebaseapp.com",
  projectId: "publicaciones-d140c",
  storageBucket: "publicaciones-d140c.appspot.com",
  messagingSenderId: "782721166400",
  appId: "1:782721166400:web:4d805858f31871d010c3a5"
};
*/

const firebaseConfig = {
  apiKey: "AIzaSyDOT1pGJQd1G-6Qusm7chIW6X3PcdixH0k",
  authDomain: "publicaciones-d140c.firebaseapp.com",
  projectId: "publicaciones-d140c",
  storageBucket: "publicaciones-d140c.appspot.com",
  messagingSenderId: "782721166400",
  appId: "1:782721166400:web:4d805858f31871d010c3a5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore();

export const saveTask = (title, description, userName, date, hours) =>
  addDoc(collection(db, "publications"), { title, description, userName, date, hours });

export const getTasks = () => getDocs(collection(db,'publications'));

export const onGetTasks = (callback) => onSnapshot (collection(db,'publications'), callback);

export const deleteTask = id => deleteDoc (doc(db,'publications',id));

export const getTask = id => getDoc (doc(db,'publications',id));

export const updateTask = (id,newFields) => updateDoc (doc(db,'publications',id), newFields);
