import firebase from 'firebase/compat/app';
import "firebase/compat/auth";
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCTZRaDllDSdoRHMShOYX2C-NU7fpED7LQ",
    authDomain: "dummy-842b6.firebaseapp.com",
    projectId: "dummy-842b6",
    storageBucket: "dummy-842b6.appspot.com",
    messagingSenderId: "75306941261",
    appId: "1:75306941261:web:269896951d03a17e5e5504",
    measurementId: "G-WNRPZQBWKC"
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
export {
    firebaseApp, auth, db,
};

export default firebaseConfig;
