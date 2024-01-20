import { useContext, createContext } from "react";
import { GoogleAuthProvider, signInWithPopup, signInWithRedirect,signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../components/firebase";
import { useEffect, useState } from "react";
const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {

    const [user, setUser] = useState({});   

    const googleSignIn = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .catch(error => {
                console.error("Google sign-in error:", error.code, error.message);
                // Handle the error or log it for further investigation
            });
    };
    

    const logout = () => {
        signOut(auth);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            console.log('User', currentUser);

            return () => {
                unsubscribe();
            }
        })
    }, [])

    return(
        <AuthContext.Provider value={{ googleSignIn, logout, user }}>
            { children }
        </AuthContext.Provider>
    )

}

export const UserAuth = () => {
    return useContext(AuthContext)
}