import api from './api';

export const authenticateUser = async ( 
    setUserData,
    setIsAuthenticated,
    setErrorMessage,
    setIsLoading) => {

    setIsLoading(true);

    try {
        const response = await api.get('/authenticateUser', { withCredentials: true });
        if (response.data.message === 'Authentication successful!') {
            const getUserData = await api.get(`/users/${response.data.user_id}`)
            setIsAuthenticated(true);
            setUserData(getUserData.data);
        } else {
            setIsAuthenticated(false);
            setErrorMessage(response.data.message || 'Failed to authenticate user');
        }
    } catch (error) {
        setIsAuthenticated(false);
        setErrorMessage(error.response?.data?.message || 'Failed to authenticate user');
    } finally {
        setIsLoading(false); // Завершаем загрузку после вызова API
    }
};
