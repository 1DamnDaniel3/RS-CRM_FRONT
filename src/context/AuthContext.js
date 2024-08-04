import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [userData, setUserData] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    return (
        <AuthContext.Provider value={{ 
            userData, setUserData,
            errorMessage, setErrorMessage,
            isLoading, setIsLoading,
            isAuthenticated, setIsAuthenticated }}>
                
            {children}
        </AuthContext.Provider>
    );
};
