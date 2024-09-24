// import { updateUser } from '../../../services/userServices'
import { updateEntity } from '../../../services/entitiesServices';

export const handleSave = async (field, value, userData, setUserData) => {
    try {
        const updatedData = { ...userData, [field]: value };
        updateEntity('users', userData.user_id, field, value)
        setUserData(updatedData);
    } catch (error) {
        console.error('Error updating user data:', error);
    }
};