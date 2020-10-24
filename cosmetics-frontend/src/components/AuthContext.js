import React, {createContext, useState, useEffect} from 'react';

export const authContext = createContext({});

export const decodeUsernameFromAuthentication = decodedString => {
    let username = decodedString.split(" ")[1];
    username = atob(username);
    return username.split(":")[0]
}

const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState(null);

    const setAuthData = (data) => {
        setAuth(data);
    };

    useEffect(() => {
        setAuth(JSON.parse(sessionStorage.getItem('accountToken')));
    }, []);

    useEffect(() => {
        sessionStorage.setItem('accountToken', auth ? JSON.stringify(auth) : null);
    }, [auth]);

    return (
        <authContext.Provider value={{auth, setAuthData}}>
            {children}
        </authContext.Provider>
    );
};

export default AuthProvider;