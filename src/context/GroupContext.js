import React, { createContext, useState } from 'react';

export const GroupContext = createContext();

export const GroupProvider = ({ children }) => {
    const [selectedGroup, setSelectedGroup] = useState(null);

    return (
        <GroupContext.Provider value={{ selectedGroup, setSelectedGroup }}>
            {children}
        </GroupContext.Provider>
    );
};
