import React, { useState } from 'react';
import './editableFieldStyle.css'

const EditableField = ({ id, label, value, onSave }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [inputValue, setInputValue] = useState(value);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = () => {
        onSave(inputValue);
        setIsEditing(false);
    };

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    return (
        <div className="editableField">
            <label htmlFor={id}>{label}</label>
            {isEditing ? (
                <div>
                    <input id={id} type="text" value={inputValue} onChange={handleInputChange} />
                    <button onClick={handleSaveClick}>Save</button>
                </div>
            ) : (
                <div>
                    <h3 id={`${id}-display`}>{value}</h3>
                    <button onClick={handleEditClick}>Edit</button>
                </div>
            )}
        </div>
    );
};

export default EditableField;
