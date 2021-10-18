import firebase from "firebase/compat";


const firebaseConfig = {

//config
};


// Initialize Firebase

const app = firebase.initializeApp(firebaseConfig);


const db = app.firestore();

const auth = firebase.auth();

const storage = firebase.storage()


export { db, auth, storage };