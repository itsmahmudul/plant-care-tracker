import React, { useEffect, useState } from 'react';
import AuthContext from './AuthContext';
import { auth } from '../Firebase/firebase.config';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';


const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {

    
    const [loading, setLoading] = useState(true)
    const [darkMode, setDarkMode] = useState(() => {
        const saved = localStorage.getItem("darkMode");
        return saved === "true" || false;
    });

    const cerateUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }

    const googleSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

    useEffect(() => {
        const className = "dark";
        const htmlElement = document.documentElement;
        if (darkMode) {
            htmlElement.classList.add(className);
        } else {
            htmlElement.classList.remove(className);
        }
        localStorage.setItem("darkMode", darkMode);
    }, [darkMode]);

    const toggleDarkMode = () => setDarkMode(!darkMode);

    const userInfo = {
        darkMode,
        toggleDarkMode,
        cerateUser,
        signInUser,
        googleSignIn,
        loading
    }

    return (
        <>
            <AuthContext.Provider value={userInfo}>
                {children}
            </AuthContext.Provider>
        </>
    );
};

export default AuthProvider;