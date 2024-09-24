import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const TableComponent = ({
    data, 
    setData, 
    columns, 
    onEditClick, 
    onInputChange, 
    onSaveClick, 
    onDateChange, 
    onDeleteClick, 
    onAddClick, 
    newEntry, 
    setNewEntry, 
    onSaveNewEntry, 
    onCancelNewEntry,
    group
}) => {
    const [editingField, setEditingField] = useState({ id: null, field: null });
    const [isAdding, setIsAdding] = useState(false);

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        {columns.map((col, index) => <th key={index}>{col.header}</th>)}
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={item.id}>
                            {columns.map((col) => (
                                <td 
                                    key={col.field}
                                    onClick={() => onEditClick(item.id, col.field, setEditingField)}
                                >
                                    {editingField.id === item.id && editingField.field === col.field ? (
                                        col.type === 'date' ? (
                                            <DatePicker
                                                selected={new Date(item[col.field])}
                                                onChange={(date) => onDateChange(date, item.id, col.field, data, setData)}
                                                dateFormat='yyyy-MM-dd'
                                                className='tableInput'
                                                autoFocus
                                            />
                                        ) : (
                                            <input
                                                className='tableInput'
                                                name={col.field}
                                                value={item[col.field]}
                                                onChange={(e) => onInputChange(e, item.id, col.field, data, setData)}
                                                onBlur={() => onSaveClick(item.id, col.field, data, setEditingField)}
                                                autoFocus
                                            />
                                        )
                                    ) : (
                                        col.type === 'date' ? new Date(item[col.field]).toLocaleDateString() : item[col.field]
                                    )}
                                </td>
                            ))}
                            <td>
                                <button onClick={() => onDeleteClick(item.id)}>Удалить</button>
                            </td>
                        </tr>
                    ))}

                    {isAdding && (
                        <tr>
                            {columns.map((col) => (
                                <td key={col.field}>
                                    {col.type === 'date' ? (
                                        <DatePicker
                                            selected={newEntry[col.field]}
                                            onChange={(date) => onDateChange(date, null, col.field, newEntry, setNewEntry)}
                                            dateFormat='yyyy-MM-dd'
                                            className='tableInput'
                                            autoFocus
                                        />
                                    ) : (
                                        <input
                                            className='tableInput'
                                            name={col.field}
                                            value={newEntry[col.field]}
                                            onChange={(e) => onInputChange(e, null, col.field, newEntry, setNewEntry)}
                                        />
                                    )}
                                </td>
                            ))}
                            <td>
                                <button onClick={() => onSaveNewEntry(newEntry, setData, setIsAdding)}>Сохранить</button>
                                <button onClick={() => onCancelNewEntry(setIsAdding)}>Отменить</button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            <button onClick={() => onAddClick(setIsAdding)}>Добавить запись</button>
        </div>
    );
};

export default TableComponent;
