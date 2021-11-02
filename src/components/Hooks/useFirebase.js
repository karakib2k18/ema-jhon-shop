import { useEffect, useState } from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut, getIdToken} from "firebase/auth";
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
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                getIdToken(user)
                .then((idToken)=>localStorage.setItem('idToken', idToken))
                  
                setUser(user);
                //setUser(user.uid);
            }else{
                setUser({});
            }
            return ()=> unsubscribe;
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return {
        user,
        signInUsingGoole,
        logOut
    }
};

export default useFirebase;


