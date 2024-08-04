import React, { useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import "./styles/profileStyle.css"

import PhotoUpload from '../common/photoUpload'
import EditableField from '../common/editableField';

import {
    handleSave
} from './handlers/profileHandlers'

const Profile = () => {
    const {userData, setUserData, errorMessage} = useContext(AuthContext);

    useEffect(() => {
        // If troubles with authenticate
        if (errorMessage) {
            alert(errorMessage);  
        }
    }, [errorMessage]);

    return (
        <div className='globalspace'>
            <div className="mainSpace">
                <div className="leftPart">
                    <div className='leftPartContainer'>
                        {userData ? (
                            <>
                                <PhotoUpload serverData={`${userData.user_type} ${userData.second_name} ${userData.first_name} ${userData.patronymic} `}/>
                                <div className='leftInfoContainer'>
                                    <div className='LeftInfo'>
                                        <EditableField
                                            id="email"
                                            label="Email:"
                                            value={userData.email}
                                            onSave={(value) => handleSave('email', value, userData, setUserData)}
                                        />
                                        <EditableField
                                            id="hiredate" 
                                            label="Работает с:"
                                            value={userData.hiredate}
                                            onSave={(value) => handleSave('hiredate', value, userData, setUserData)}
                                        />
                                        <EditableField
                                            id="passport"
                                            label="Паспорт:"
                                            value={userData.pasport_data}
                                            onSave={(value) => handleSave('pasport_data', value, userData, setUserData)}
                                        />
                                        <EditableField
                                            id="phone"
                                            label="Телефон:"
                                            value={userData.phone}
                                            onSave={(value) => handleSave('phone', value, userData, setUserData)}
                                        />
                                        <EditableField
                                            id="salary"
                                            label="Зарплата:"
                                            value={userData.salary}
                                            onSave={(value) => handleSave('salary', value, userData, setUserData)}
                                        />
                                    </div>
                                </div>
                            </>
                        ) : (
                            <p>Loading user data...</p>
                        )}
                    </div>
                </div>
                <div className="rightPart">
                    <div className='rightPartContainer'>
                        DSADASDASDASDS
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
