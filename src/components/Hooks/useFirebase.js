import { useEffect, useState } from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from "firebase/auth";
import firebaseInitAuthentication from "../../Firebase/firebase.init";

firebaseInitAuthentication();

const useFirebase = () => {
    const [user, setUser] = useState({});
    const auth = getAuth();
    const googleProvider = new GoogleAuthProvider();

    const signInUsingGoole = () => {
        return signInWithPopup(auth, googleProvider);
        // .then((result) => {
        //     console.log(result.user)
        //     setUser(result.user);
        // }).catch((error) => {
        //     // Handle Errors here.
        //     console.log(error.message);
        // });
    }
    const logOut = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
            console.log("User is signed out")
            setUser({})
        })
    }

    //observe user state changed or not
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
                //setUser(user.uid);
            }
        })
    }, [])

    return {
        user,
        signInUsingGoole,
        logOut
    }
};

export default useFirebase;


