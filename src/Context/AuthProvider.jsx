import React, { useEffect, useState } from 'react';
import AuthContext from './AuthContext';

const AuthProvider = ({ children }) => {

    const [darkMode, setDarkMode] = useState(() => {
        const saved = localStorage.getItem("darkMode");
        return saved === "true" || false;
    });

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
        toggleDarkMode
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