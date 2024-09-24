import api from './api';

export const fetchStudents = async () => {
    try {
        const response = await api.get(`/students`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching`, error);
        throw error;
    }
};

export const fetchPayments = async () => { 
    try {
        const response = await api.get(`/payment`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching`, error);
        throw error;
    }
};