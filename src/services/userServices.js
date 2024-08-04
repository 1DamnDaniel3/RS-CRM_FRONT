import api from './api';

export const updateUser = async (userId, updatedData) => {
    try {
        await api.put(`/users/${userId}`, updatedData);
        return true;
    } catch (error) {
        console.error('Error updating user data:', error);
        throw error;
    }
};