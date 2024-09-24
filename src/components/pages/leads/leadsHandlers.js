import {fetchEntities, deleteEntity, saveNewEntity, updateEntity} from '../../../services/entitiesServices'
import { format } from 'date-fns';


//getting all leads from DB to draw them on web-site
export const fetchLeads = async (setLeads) => {
    try {
        const leads = await fetchEntities('leads');
        setLeads(leads);
    } catch (error) {
        console.error('Error fetching leads:', error);
    }
};


//  ================================ LEADS HANDLER

//delete lead
export const handleDeleteLead = async (id, leads, setLeads) => {
    try {
        const success = await deleteEntity('leads', id);
        if(success) setLeads(leads.filter(lead => lead.lead_id !== id));
    } catch (error) {
        console.error('Error deleting lead:', error);
    }
};

// change new lead info
export const handleNewLeadChange = (e, newLead, setNewLead) => {
    const { name, value } = e.target;
    setNewLead({ ...newLead, [name]: value });
};

// Save new lead
export const handleSaveNewLead = async (newLead, leads, setLeads, setIsAdding, resetNewLead) => {
    try {
        const createdLead = await saveNewEntity('leads', newLead);
        setLeads([...leads, createdLead]);
        setIsAdding(false);
        resetNewLead();
    } catch (error) {
        console.error('Error creating new lead', error);
    }
};

// Save new info about lead
export const handleSaveClick = async (id, field, leads, setEditingField) => {
    const lead = leads.find(lead => lead.lead_id === id);
    try {
        const success = await updateEntity('leads', id, field, lead[field]);
        if (success) setEditingField({id: null, field: null});
    } catch (error) {
        console.error('Error updating lead:', error);
    }
};

// container for functions to scroll down and change adding state
export const handleAddLead = async (setIsAdding, scrollToBottom) => {
    setIsAdding(true);
    scrollToBottom();
  };


// Reset new lead. Cancel editing
export const handleCancelNewLead = (setIsAdding, resetNewLead) => {
    setIsAdding(false);
    resetNewLead();
};

//  ================================================================ TABLE HANDLERS

// set editing field
export const handleEditClick = (id, field, setEditingField) => {
    setEditingField({ id, field });
};

// set new info about lead(field, id, value) to update DB 
export const handleInputChange = (e, id, field, leads, setLeads) => {
    const { value } = e.target;
    setLeads(leads.map(lead => (lead.lead_id === id ? { ...lead, [field]: value } : lead)));
};

//  ================================================================ CLIENT HANDLERS


export const handleClientChange = (e, setClientData) => {
    const { name, value } = e.target;
    setClientData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  export const handleClientSubmit = async (e, clientData, closePortal, lead_id, setLeads) => {
    e.preventDefault();
    try {
        await saveNewEntity('clients', clientData);
        console.log('Client data saved:', clientData);
        await deleteEntity('leads', lead_id)
        await fetchLeads(setLeads)
        closePortal();
    } catch (error) {
        console.error('Error saving client data:', error);
    }
};

//  ================================================================ EDIT DATE HANDLERS

export const handleDateChange = (date, id, field, leads, setLeads) => {
    const formattedDate = format(date, 'yyyy-MM-dd');
    setLeads(leads.map(lead => (lead.lead_id === id ? { ...lead, [field]: formattedDate } : lead)));
};

export const handleNewDateChange = (date, setNewLead) => {
    const formattedDate = format(date, 'yyyy-MM-dd');
    setNewLead(prev => ({ ...prev, trial_date: formattedDate }));
};


export const resetNewLead = () => ({
    first_name: '',
    second_name: '',
    phone: '',
    qualification: '',
    trial_date: '',
});