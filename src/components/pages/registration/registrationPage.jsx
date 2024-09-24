// src/components/pages/Register.js
import React, { useState } from 'react';
import api from '../../../services/api';
import '../../../assets/styles/forms.css'
import './registerPage.css'

const Register = () => {
  const [formData, setFormData] = useState({
    user_type: '',
    second_name: '',
    first_name: '',
    patronymic: '',
    pasport_data: '',
    phone: '',
    salary: '',
    hiredate: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting form data:', formData); // Логирование отправляемых данных
    try {
      const response = await api.post('/users/registration', formData);
      console.log('User registered successfully:', response.data);
    } catch (error) {
      console.error('Error registering user:', error);
      console.error('Error response data:', error.response.data); // Логирование данных ошибки
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="user_type" placeholder="User Type" onChange={handleChange} />
      <input type="text" name="second_name" placeholder="Second Name" onChange={handleChange} />
      <input type="text" name="first_name" placeholder="First Name" onChange={handleChange} />
      <input type="text" name="patronymic" placeholder="Patronymic" onChange={handleChange} />
      <input type="text" name="pasport_data" placeholder="Passport Data" onChange={handleChange} />
      <input type="text" name="phone" placeholder="Phone" onChange={handleChange} />
      <input type="text" name="salary" placeholder="Salary" onChange={handleChange} />
      <input type="date" name="hiredate" placeholder="Hire Date" onChange={handleChange} />
      <input type="email" name="email" placeholder="Email" onChange={handleChange} />
      <input type="password" name="password" placeholder="Password" onChange={handleChange} />
      <button className='formBtn' type="submit">Register</button>
    </form>
  );
};

export default Register;
