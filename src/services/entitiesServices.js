import api from './api';

export const fetchEntities = async (entity, selectedGroup) => {
    try {
        const response = await api.get(`/${entity}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching ${entity}:`, error);
        throw error;
    }
};

// Функция для получения групп с сервера
export const fetchGroups = async (entityType) => {
    try {
        const response = await api.post('/entityGroups/groupList', { entity_type: entityType });
        return response.data.groups
    } catch (error) {
        console.error(`Error fetching groups for ${entityType}:`, error);
        throw error;
    }
};

// Универсальная функция для удаления сущности
export const deleteEntity = async (entity, id) => {
    try {
        await api.delete(`/${entity}/${id}`);
        return true;
    } catch (error) {
        console.error(`Error deleting ${entity}:`, error);
        throw error;
    }
};

// Универсальная функция для создания новой сущности
export const saveNewEntity = async (entity, newEntityData) => {
    try {
        const response = await api.post(`/${entity}/registration`, newEntityData);
        return response.data;
    } catch (error) {
        console.error(`Error creating new ${entity}:`, error);
        throw error;
    }
};

// Универсальная функция для обновления данных сущности
export const updateEntity = async (entity, id, field, value) => {
    try {
        await api.put(`/${entity}/${id}`, { [field]: value });
        return true;
    } catch (error) {
        console.error(`Error updating ${entity}:`, error);
        throw error;
    }
};

// Универсальная функция для получения одной сущности по ID
export const fetchEntityById = async (entity, id) => {
    try {
        const response = await api.get(`/${entity}/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching ${entity} by ID:`, error);
        throw error;
    }
};
