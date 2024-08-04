import { updateUser } from '../../../services/userServices'

export const handleSave = async (field, value, userData, setUserData) => {
    try {
        const updatedData = { ...userData, [field]: value };
        updateUser(userData.user_id, updatedData)
        setUserData(updatedData);
    } catch (error) {
        console.error('Error updating user data:', error);
    }
};