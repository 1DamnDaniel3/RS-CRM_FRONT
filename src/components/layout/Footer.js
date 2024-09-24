import React, { useState, useEffect, useContext } from 'react';
import { GroupContext } from '../../context/GroupContext';
import './styles/footer.css'

import {
    fetchGroupsData,
} from '../pages/entitiesHandlers'

const Footer = () => {
    const {selectedGroup, setSelectedGroup} = useContext(GroupContext)
    const [groups, setGroups] = useState();

    useEffect(()=> {
        fetchGroupsData('students', setGroups)
    }, [setGroups])

    useEffect(()=> {
        console.log('GROUPS', groups)
    })

    return(
        <footer>
            <div className='groupsCountainer'>
                {groups.map((group, index) => (
                    <label></label>
                ))}
                <button className='addGroupBtn'>+</button>
            </div>
        </footer>
    )
};

export default Footer;