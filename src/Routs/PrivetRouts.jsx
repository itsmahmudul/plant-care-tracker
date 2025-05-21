import React, { useContext } from 'react';
import AuthContext from '../Context/AuthContext';
import { Navigate, useLocation } from 'react-router';

const PrivetRouts = ({ children }) => {

    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    if (loading) {
        return <span className="loading loading-spinner text-success"></span>
    }

    if(!user){
        <Navigate state={location.pathname} to='/login'></Navigate>
    }

    return children
};

export default PrivetRouts;