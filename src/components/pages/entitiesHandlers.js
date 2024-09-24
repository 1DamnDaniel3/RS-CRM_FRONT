import {fetchEntities, fetchGroups, deleteEntity, saveNewEntity, updateEntity } from '../../services/entitiesServices'
import { format } from 'date-fns';


//getting all entities from DB to draw them on web-site
export const fetchEntitiesData = async (entityType, selectedGroup, setData) => {
    try {
        if (!selectedGroup) {
            // Если группа не выбрана, очищаем данные
            setData([]);
            return;
        }

        const data = await fetchEntities(entityType, selectedGroup);
        setData(data.length > 0 ? data : []); // Устанавливаем пустой массив, если данных нет
    } catch (error) {
        console.error(`Error fetching ${entityType}:`, error);
    }
};

export const fetchGroupsData = async (entityType, setGroups) => {
    try {
        const items = await fetchGroups(entityType); 
        const groups = items.map(item => item.Group.group_name)
        setGroups(groups.length > 0 ? groups : []); 
    } catch (error) {
        console.error(`Error fetching groups for ${entityType}:`, error);
    }
};


//  ================================ ENTITY HANDLER

//delete entity
export const handleDeleteEntity = async (entityType, id, data, setData) => {
    try {
        const success = await deleteEntity(entityType, id);
        if(success) setData(data.filter(item => item.id !== id));
    } catch (error) {
        console.error(`Error deleting ${entityType}:`, error);
    }
};


// change new entity info
export const handleNewEntityChange = (e, newEntity, setNewEntity) => {
    const { name, value } = e.target;
    setNewEntity({ ...newEntity, [name]: value });
};

// Save new entity
export const handleSaveNewEntity = async (entityType, newEntity, data, setData, setIsAdding, resetNewEntity) => {
    try {
        const createdEntity = await saveNewEntity(entityType, newEntity);
        setData([...data, createdEntity]);
        setIsAdding(false);
        resetNewEntity();
    } catch (error) {
        console.error(`Error creating new ${entityType}:`, error);
    }
};

// Save new info about entity
export const handleSaveClick = async (entityType, id, field, data, setEditingField) => {
    const item = data.find(item => item.id === id);
    try {
        const success = await updateEntity(entityType, id, field, item[field]);
        if (success) setEditingField({id: null, field: null});
    } catch (error) {
        console.error(`Error updating ${entityType}:`, error);
    }
};

//  ================================================================ TABLE HANDLERS

// set editing field
export const handleEditClick = (id, field, setEditingField) => {
    setEditingField({ id, field });
};

// set new info about lead(field, id, value) to update DB 
export const handleInputChange = (e, id, field, data, setData) => {
    const { value } = e.target;
    setData(data.map(item => (item.id === id ? { ...item, [field]: value } : item)));
}; 

//  ================================================================ EDIT DATE HANDLERS

export const handleDateChange = (date, id, field, data, setData) => {
    const formattedDate = format(date, 'yyyy-MM-dd');
    setData(data.map(item => (item.id === id ? { ...item, [field]: formattedDate } : item)));
};
