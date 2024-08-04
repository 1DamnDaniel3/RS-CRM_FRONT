import api from './api'

// to delete leads
export const deleteLead = async (id) => {
    try{
        await api.delete(`/leads/${id}`);
        return true;
    }catch(error){
        console.error('Error deleting lead: ', error);
        throw error;
    }
};
// to register new lead
export const saveNewLead = async (newLead) => {
    try{
        const response = await api.post('/leads/registration', newLead);
        return response.data
    }catch(error){
        console.error('Error deleting lead: ', error);
        throw error;
    }
};
// update lead data
export const updateLead = async (id, field, value) => {
    try {
        await api.put(`/leads/${id}`, { [field]: value });
        return true;
    } catch (error) {
        console.error('Error updating lead:', error);
        throw error;
    }
};
//get all leads
export const getLeads = async () => {
    try {
        const response = await api.get('/leads');
        return response.data;
    } catch (error) {
        console.error('Error fetching leads:', error);
        throw error;
    }
};