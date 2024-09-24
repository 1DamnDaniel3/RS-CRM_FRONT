import React from 'react';

const GroupSelector = ({ groups, selectedGroup, onGroupChange, onAddGroup }) => {
    return (
        <footer>
            <div className='groupsCountainer'>
                {groups.map(group => (
                    <button 
                        key={group.id} 
                        onClick={() => onGroupChange(group.id)}
                        className={selectedGroup === group.id ? 'selected' : ''}
                    >
                        {group.name}
                    </button>
                ))}
                <button className='addGroupBtn' onClick={onAddGroup}>+</button>
            </div>
        </footer>
    );
};

export default GroupSelector;
