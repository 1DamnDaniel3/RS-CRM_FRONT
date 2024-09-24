import React, { useState, useEffect } from 'react';
import TableComponent from './TableComponent';
import GroupSelector from './GroupSelector';
import {
    fetchEntitiesData,
    handleDeleteEntity,
    handleNewEntityChange,
    handleSaveNewEntity,
    handleSaveClick,
    handleEditClick,
    handleInputChange,
    handleDateChange,
} from '../handlers/entitiesHandlers'
import { fetchGroups } from './api'; // Импорт функций для API запросов

const EntityPage = ({ entityType }) => {
    const [data, setData] = useState([]);
    const [newEntry, setNewEntry] = useState({});
    const [groups, setGroups] = useState([]);
    const [selectedGroup, setSelectedGroup] = useState(null);

    useEffect(() => {
        fetchGroups(entityType).then(setGroups);
    }, [entityType]);

    useEffect(() => {
        fetchEntitiesData(entityType, selectedGroup, setData);
    }, [entityType, selectedGroup]);

    const handleGroupChange = (groupId) => setSelectedGroup(groupId);
    const handleAddGroup = () => {/* Добавление новой группы */};

    return (
        <div>
            <GroupSelector 
                groups={groups} 
                selectedGroup={selectedGroup} 
                onGroupChange={handleGroupChange} 
                onAddGroup={handleAddGroup} 
            />
            
            {/* Если групп нет, показываем сообщение о необходимости создать группу */}
            {groups.length === 0 && (
                <p>No groups available. Please create a group first.</p>
            )}

            {/* Если данные пустые, показываем сообщение о пустом списке */}
            {groups.length > 0 && data.length === 0 && (
                <p>No entities available for the selected group.</p>
            )}

            {/* Отображаем таблицу только если есть группы */}
            {groups.length > 0 && (
                <TableComponent 
                    data={data}
                    setData={setData}
                    columns={columns}
                    newEntry={newEntry}
                    setNewEntry={setNewEntry}
                    group={selectedGroup}
                    onEditClick={handleEditClick}
                    onInputChange={handleInputChange}
                    onSaveClick={handleSaveClick}
                    onDateChange={handleDateChange}
                    onDeleteClick={handleDeleteEntity}
                    onAddClick={() => setIsAdding(true)} // Управляет отображением формы для новой записи
                    onSaveNewEntry={handleSaveNewEntity}
                    onCancelNewEntry={() => setNewEntry({})} // Сбрасывает новую запись
                />
            )}
        </div>
    );
};

export default EntityPage;
