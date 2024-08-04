import React, { useState, useEffect, useRef  } from 'react';


import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

import './styles/leads.css';

import {
    fetchLeads,
    handleEditClick,
    handleInputChange,
    handleSaveClick,
    handleCreateClient,
    handleDateChange,
    handleNewLeadChange,
    handleSaveNewLead,
    handleNewDateChange,
    handleCancelNewLead,
    resetNewLead,
    handleDeleteLead,
    handleAddLead,
} from './handlers/leadsHandlers';

const Leads = () => {
    const [leads, setLeads] = useState([]);
    const [editingField, setEditingField] = useState({ id: null, field: null });
    const [isAdding, setIsAdding] = useState(false);
    const [newLead, setNewLead] = useState({
        first_name: '',
        second_name: '',
        phone: '',
        qualification: '',
        trial_date: ''
    });
    const [hoveredLeadId, setHoveredLeadId] = useState(null)
    const leadsMainSpace = useRef(null)

    useEffect(() => {
        fetchLeads(setLeads);
    }, []);

    const scrollToBottom = () => {
        leadsMainSpace.current.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
    };

    // ================================================ DRAWING ================================================ \\ 

    return (
        <div className='leadsGlobalspace'>
            <div className='leadsMainSpace' ref={leadsMainSpace}>
                <table className='leadsTable'>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>First Name</th>
                            <th>Second Name</th>
                            <th>Phone</th>
                            <th>Qualification</th>
                            <th>Trial Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>

                        {/* ============== Table body vertical fields. Table leads ID */}

                        {leads.map((lead, index) => (
                            <tr 
                                key={lead.lead_id}
                                onMouseEnter={() => setHoveredLeadId(lead.lead_id)}
                                onMouseLeave={() => setHoveredLeadId(null)}
                            >
                                <td className='ID'>
                                    {index + 1}
                                        {hoveredLeadId === lead.lead_id && (
                                            <button
                                                className='deleteLeadBtn'
                                                onClick={() => handleDeleteLead(lead.lead_id, leads, setLeads)}
                                            >
                                                &times;
                                            </button>
                                        )}
                                </td>

                                {/* ============== Table body horisontal fields. Setting leads info =================*/}
                                
                                {['first_name', 'second_name', 'phone', 'qualification', 'trial_date'].map(field => (
                                    <td key={`${lead.lead_id}-${field}`} onClick={() => handleEditClick(lead.lead_id, field, setEditingField)}>
                                        {editingField.id === lead.lead_id && editingField.field === field ? (
                                            field === 'trial_date' ? (
                                                <DatePicker
                                                    selected={new Date(lead[field])}
                                                    onChange={(date) => handleDateChange(date, lead.lead_id, field, leads, setLeads)}
                                                    onBlur={() => handleSaveClick(lead.lead_id, field, leads, setEditingField)}
                                                    dateFormat='yyyy-MM-dd'
                                                    className='tableInput'
                                                    autoFocus
                                                />
                                            ) : (
                                                <input
                                                    className='tableInput'
                                                    name={field}
                                                    value={lead[field]}
                                                    onChange={(e) => handleInputChange(e, lead.lead_id, field, leads, setLeads)}
                                                    onBlur={() => handleSaveClick(lead.lead_id, field, leads, setEditingField)}
                                                    autoFocus
                                                />
                                            )
                                        ) : (
                                            field === 'trial_date' ? new Date(lead[field]).toLocaleDateString() : lead[field]
                                        )}
                                    </td>
                                ))}
                                {/* ============== Table body horisontal fields. Adding button create client =================*/}
                                <td>
                                    <button className='createClientBtn' onClick={() => handleCreateClient(lead.lead_id)}>
                                        Создать клиента
                                    </button>
                                </td>
                            </tr>
                        ))}

                        {/* ============== Creating new Leads =================*/}

                        {isAdding && (
                            <tr>
                                <td>#</td>
                                {['first_name', 'second_name', 'phone', 'qualification', 'trial_date'].map(field => (
                                    <td key={`new-${field}`}>
                                        {field === 'trial_date' ? (
                                            <DatePicker
                                                selected={newLead.trial_date}
                                                onChange={(date) => handleNewDateChange(date, setNewLead)}
                                                dateFormat='yyyy-MM-dd'
                                                className='tableInput'
                                            />
                                        ) : (
                                            <input
                                                className='tableInput'
                                                name={field}
                                                value={newLead[field]}
                                                onChange={(e) => handleNewLeadChange(e, newLead, setNewLead)}
                                            />
                                        )}
                                    </td>
                                ))}
                                {/* ============== Save new lead or Cancel creating one =================*/}
                                <td>
                                    <button className='saveNewLeadBtn' onClick={() => handleSaveNewLead(newLead, leads, setLeads, setIsAdding, () => setNewLead(resetNewLead()))}>
                                        Сохранить Лида
                                    </button>
                                    <button className='cancelNewLeadBtn' onClick={() => handleCancelNewLead(setIsAdding, () => setNewLead(resetNewLead()))}>
                                        Отменить
                                    </button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                
            </div>
            
                        {/* ============== Add lead button =================*/}

            {!isAdding && (
                <button className='addLeadbtn' onClick={() => handleAddLead(setIsAdding, scrollToBottom)}>
                    Добавить Лида
                </button>
                
            )}

            <button onClick={scrollToBottom} className='scrollToBottomBtn'>
                    Scroll 
            </button>
        </div>
    );
};

export default Leads;
