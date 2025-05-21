import React, { useEffect, useState } from 'react';
import AuthContext from './AuthContext';
import { auth } from '../Firebase/firebase.config';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [darkMode, setDarkMode] = useState(() => {
        const saved = localStorage.getItem("darkMode");
        return saved === "true" || false;
    });

    const cerateUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
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