import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, getDoc, addDoc,collection,getFirestore } from "firebase/firestore";
import { toast } from 'react-toastify';


const firebaseConfig = {
  apiKey: `${import.meta.env.VITE_FIREBASE_API_KEY}`,
  authDomain: `${import.meta.env.VITE_FIREBASE_AUTH_DOMAIN}`,
  projectId: `${import.meta.env.VITE_FIREBASE_PROJECT_ID}`,
  storageBucket: `${import.meta.env.VITE_FIREBASE_STORAGE_BUCKET}`,
  messagingSenderId: `${import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID}`,
  appId: `${import.meta.env.VITE_FIREBASE_APP_ID}`,
  measurementId: `${import.meta.env.VITE_FIREBASE_MEASUREMENT_ID}`
};





// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "user"),{
            uid: user.uid,
            displayName: name,
            authProvider: 'local',
            email,
        })
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const login = async (email, password) => {
    try {
        console.log(firebaseConfig);
        const res = await signInWithEmailAndPassword(auth, email, password);
        const user = res.user;
        console.log(JSON.stringify(user)); 
        const docRef = doc(db, "displayName", "nelson");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
        }
    } catch (error) {
        console.log(error);
        toast.error(error.code.toString().includes("auth/invalid")     
        ? <div>Invalid email or password.<br /> Please try again.</div>
        : "Somthing went wrong. Contact the administrator.");
    }
}

const logout = () => {
    console.log("logout");
    signOut(auth);
}

export {auth, db, login, signup, logout};