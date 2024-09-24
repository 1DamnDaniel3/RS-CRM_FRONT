import api from './api'

// save new Client
export const saveNewClient = async (newClient) => {
    try{
        const response = await api.post('/clients/registration', newClient);
        return response.data
    }catch(error){
        console.error('Error deleting lead: ', error);
        throw error;
    }
};