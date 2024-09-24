import React, { useContext, useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';
import { authenticateUser } from '../../../services/auth';

const ProtectedRoute = () => {
    const { isAuthenticated, setIsAuthenticated,
            userData, setUserData,
            isLoading, setIsLoading,
            errorMessage, setErrorMessage 
        } = useContext(AuthContext);

    const [initialized, setIsInitialized] = useState(false);
    useEffect(() => {
        const authenticate = async () => {
            try {
                await authenticateUser( 
                    setUserData,
                    setIsAuthenticated,
                    setErrorMessage,
                    setIsLoading);
            } catch (error) {
                setErrorMessage(error.message);
            } finally{
                setIsInitialized(true);
            }
        };

        authenticate(); 
    }, [setUserData, isAuthenticated, setIsAuthenticated, setErrorMessage, setIsLoading]);

    if (!initialized || isLoading) {
        return <div>Loading...</div>; // Ваш компонент загрузки здесь
    }

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
