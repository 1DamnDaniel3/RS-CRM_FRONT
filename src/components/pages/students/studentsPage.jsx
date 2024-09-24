import React, {useEffect, useState} from "react";
import StudentComponent from './Table/student/studentTD'
import st from './studentsPage.module.css'

import {
    fetchGroupsData
} from '../entitiesHandlers'

const Students = () => {

    const [studentData, setUserData] = useState();
    const [groups, setGroups] = useState();

    useEffect(()=> {
        fetchGroupsData('students', setGroups)
    }, [setGroups])
    // const studentData = 

    return (
        <div>
            <table className={st.Table}>
                <thead>
                    <tr>
                        <th className={`${st.ID} ${st.tableHeader}`}>#</th>
                        <th className={`${st.FIO} ${st.tableHeader}`}>Second name</th>
                        <th className={`${st.FIO} ${st.tableHeader}`}>First name</th>
                        <th className={`${st.FIO} ${st.tableHeader}`}>Patronymic</th>
                        <th className={`${st.Phone} ${st.tableHeader}`}>Phone</th>
                        <th className={st.tableHeader}>Birthdate</th>
                        <th className={st.tableHeader}>Join date</th>
                    </tr>
                </thead>
            </table>
            <StudentComponent></StudentComponent>
        </div>
        
    );
};

export default Students;
