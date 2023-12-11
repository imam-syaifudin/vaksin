import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Auth({children}) {
    const navigate = useNavigate();
    useEffect(() => {
        if ( !localStorage.getItem('token') ){
            navigate('/login');
        } 
        
        if( localStorage.getItem('token') ){
            let path = window.location.pathname;
            if ( path == '/login'){
                navigate('/home');
            }
        }
    },[]);
    return (
        <>
            {children}
        </>
    );
}

export default Auth;