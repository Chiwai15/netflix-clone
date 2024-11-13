import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, getDoc, addDoc,collection,getFirestore } from "firebase/firestore";
import { toast } from 'react-toastify';


const firebaseConfig = {
  apiKey: "AIzaSyALXz8CJgaI18O-K0Fdi-WFeS7vg6QCJQs",
  authDomain: "netflix-clone-a9c3c.firebaseapp.com",
  projectId: "netflix-clone-a9c3c",
  storageBucket: "netflix-clone-a9c3c.firebasestorage.app",
  messagingSenderId: "215375078044",
  appId: "1:215375078044:web:91d6c219061b63bc1d0359",
  measurementId: "G-RT02X6QXJ8"
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
    signOut(auth);

}

export {auth, db, login, signup, logout};