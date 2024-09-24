import React, { useState, useEffect, useRef  } from 'react';

import CreateClientPortal from '../../../portals/createClientPortal';

import './leads.css';

import {
    fetchLeads,
    handleEditClick,
    handleInputChange,
    handleSaveClick,
    handleClientChange,
    handleClientSubmit,
    handleDateChange,
    handleNewLeadChange,
    handleSaveNewLead,
    handleNewDateChange,
    handleCancelNewLead,
    resetNewLead,
    handleDeleteLead,
    handleAddLead,
    
} from './leadsHandlers';

import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

import { registerLocale } from 'react-datepicker';
import ru from 'date-fns/locale/ru';  // Импортируем локаль для русского языка
registerLocale('ru', ru);

const Leads = () => {
    const [leads, setLeads] = useState([]);
    const [editingField, setEditingField] = useState({ id: null, field: null });
    const [isAdding, setIsAdding] = useState(false);
    const [newLead, setNewLead] = useState({
        first_name: '',
        phone: '',
        qualification: '',
        trial_date: ''
    });
    const [hoveredLeadId, setHoveredLeadId] = useState(null)
    const leadsMainSpace = useRef(null)

    //working with create client Portal
    const [isPortalOpen, setIsPortalOpen] = useState(false);
    const [selectedLead, setSelectedLead] = useState(null);

    const openPortal = (lead) => {
        setSelectedLead(lead);
        setIsPortalOpen(true);
    };

    const closePortal = () => {
        setIsPortalOpen(false);
        setSelectedLead(null);
    };

    // ====================== ClientsData

    const [clientData, setClientData] = useState({
        first_name: '',    
        last_name: '',
        patronymic: '',
        phone: '',
        birthdate: '',
        email: '',
        address: '',
        emergency_contact_name: '',
        emergency_contact_phone: '',
        contacts: '',
        join_date: '',
    });

    useEffect(() => {
        if (selectedLead) {
            setClientData({
                first_name: selectedLead.first_name || '',
                last_name: '',
                patronymic: '',
                phone: selectedLead.phone || '',
                birthdate: '',
                email: '',
                address: '',
                emergency_contact_name: '',
                emergency_contact_phone: '',
                contacts: '',
                join_date: '',
            });
        }
    }, [selectedLead]);

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
                                
                                {['first_name', 'phone', 'qualification', 'trial_date'].map(field => (
                                    <td key={`${lead.lead_id}-${field}`} className = "infoField" onClick={() => handleEditClick(lead.lead_id, field, setEditingField)}>
                                        {editingField.id === lead.lead_id && editingField.field === field ? (
                                            field === 'trial_date' ? (
                                          
                                                    <DatePicker
                                                        selected={new Date(lead[field])}
                                                        onChange={(date) => handleDateChange(date, lead.lead_id, field, leads, setLeads)}
                                                        onBlur={() => handleSaveClick(lead.lead_id, field, leads, setEditingField)}
                                                        dateFormat='yyyy-MM-dd'
                                                        className='tableInput'
                                                        autoFocus
                                                        popperPlacement="bottom-start"
                                                        portalId="root"
                                                        locale="ru"
                                                        showWeekNumbers
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
                                    <button onClick={() => openPortal(lead)}>
                                        Создать нового клиента
                                    </button>
                                </td>
                            </tr>
                        ))}

                        {/* ============== Creating new Leads =================*/}

                        {isAdding && (
                            <tr>
                                <td>#</td>
                                {['first_name', 'phone', 'qualification', 'trial_date'].map(field => (
                                    <td key={`new-${field}`}>
                                        {field === 'trial_date' ? (
                                        
                                            <DatePicker
                                                selected={newLead.trial_date}
                                                onChange={(date) => handleNewDateChange(date, setNewLead)}
                                                dateFormat='yyyy-MM-dd'
                                                className='tableInput'
                                                autoFocus
                                                popperPlacement="bottom-start"
                                                portalId="root"
                                                locale="ru"
                                                showWeekNumbers
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
            
                        {/* ============== Add lead button ================= */}

            {!isAdding && (
                <button className='addLeadbtn' onClick={() => handleAddLead(setIsAdding, scrollToBottom)}>
                    Добавить Лида
                </button>
                
            )}

            <button onClick={scrollToBottom} className='scrollToBottomBtn'>
                    Scroll 
            </button>

            {/* ============== CREATING NEW CLIENT ================= */}
            {isPortalOpen && (
                <CreateClientPortal isOpen={isPortalOpen} onClose={closePortal}>
                <div className='createClientContainer'>
                    <form className='leadForm'>
                        <p className='checkIifoParagrapg'>Лид</p>
                        <input type='text' value={selectedLead.first_name} readOnly></input>
                        <input type='text' value={selectedLead.phone} readOnly></input>
                        <input type='text' value={selectedLead.trial_date} readOnly></input>
                    </form>
                    <form className="clientForm" onSubmit={(e) => handleClientSubmit(e, clientData, closePortal, selectedLead.lead_id, setLeads)}>
                        {/* Ваши поля формы здесь */}
                        <p className='checkIifoParagrapg'>Клиент</p>

                        <input type="text" name='first_name' placeholder="Имя" value={clientData.first_name} onChange={(e) => handleClientChange(e, setClientData)}/>
                        <input type="text" name='last_name' placeholder="Фамилия" value={clientData.last_name} onChange={(e) => handleClientChange(e, setClientData)} />
                        <input type="text" name='patronymic' placeholder="Отчество" value={clientData.patronymic} onChange={(e) => handleClientChange(e, setClientData)} />
                        <input type="text" name='phone' placeholder="Телефон" value={clientData.phone} onChange={(e) => handleClientChange(e, setClientData)}/>
                        {/* <input type="text" name='birthdate' placeholder="Дата рождения" value={clientData.birthdate} onChange={(e) => handleClientChange(e, setClientData)} /> */}
                        <DatePicker
                            selected={clientData.birthdate ? new Date(clientData.birthdate) : null}
                            onChange={(date) => handleClientChange({ target: { name: 'birthdate', value: date } }, setClientData)}
                            dateFormat='yyyy-MM-dd'
                            className='PortalDatePicker'
                            placeholderText="Дата рождения"
                            locale="ru"
                            showWeekNumbers
                        />
                        <input type="text" name='email' placeholder="Почта" value={clientData.email} onChange={(e) => handleClientChange(e, setClientData)} />
                        <input type="text" name='address' placeholder="Адрес" value={clientData.address} onChange={(e) => handleClientChange(e, setClientData)} />
                        <input type="text" name='emergency_contact_name' placeholder="Доп контакт имя" value={clientData.emergency_contact_name} onChange={(e) => handleClientChange(e, setClientData)} />
                        <input type="text" name='emergency_contact_phone' placeholder="Доп контакт телефон" value={clientData.emergency_contact_phone} onChange={(e) => handleClientChange(e, setClientData)} />
                        <input type="text" name='contacts' placeholder="Мессенджеры контакт" value={clientData.contacts} onChange={(e) => handleClientChange(e, setClientData)} />
                        {/* <input type="text" name='join_date' placeholder="Дата регистрации" value={clientData.join_date} onChange={(e) => handleClientChange(e, setClientData)} /> */}
                        <DatePicker
                            selected={clientData.join_date ? new Date(clientData.join_date) : null}
                            onChange={(date) => handleClientChange({ target: { name: 'join_date', value: date } }, setClientData)}
                            dateFormat='yyyy-MM-dd'
                            className='PortalDatePicker'
                            placeholderText="Дата регистрации"
                            locale="ru"
                            showWeekNumbers
                        />
                        
                        <button type="submit">Сохранить клиента</button>
                    </form>
                </div>
                
            </CreateClientPortal>
            )}
        </div>
    );
};

export default Leads;
