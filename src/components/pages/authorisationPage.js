import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import '../../assets/styles/forms.css';
import './styles/authorisationPage.css';
import { AuthContext } from '../../context/AuthContext';

const Authorisation = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [inputType, setInputType] = useState('password');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const { setUserData } = useContext(AuthContext);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        setErrorMessage('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Submitting form data: ", formData);
        try {
            const response = await api.post("/users/login", formData, { withCredentials: true });
            console.log('User was indenticate successfully', response.data);

            if (response.data.message === 'Login_successful') {

                const firstAuthenticate = await api.get('/authenticateUser', { withCredentials: true }); // первичная аутентификация пользователя(получение ID)
                const userDataResponse = await api.get(`/users/${firstAuthenticate.data.user_id}`);

                setUserData(userDataResponse.data);
                navigate('/profile');
            } else {
                setErrorMessage('Authorization failed, sorry');

            }
        } catch (error) {
            console.error('Error authorising user:', error);
            if (error.response && error.response.data) {
                console.error('Error response data:', error.response.data);
                setErrorMessage(error.response.data.message);
            } else {
                setErrorMessage('Произошла ошибка при авторизации.');
            }
        }
    };

    const togglePasswordVisibility = () => {
        setInputType(inputType === 'password' ? 'text' : 'password');
    };

    return (
        <div className='authorisationContainer'>
            <div className='authorisationWindow'>
                <form onSubmit={handleSubmit}>
                    <input type="email" name="email" placeholder="Email" onChange={handleChange} />
                    <div className='password-container'>
                        <input id='passwordField' type={inputType} name="password" placeholder="Password" onChange={handleChange} />
                        <button className='formBtn' id='ShowBtn' type='button' onClick={togglePasswordVisibility}>
                            {inputType === 'password' ? 'Показать' : 'Скрыть'}
                        </button>
                    </div>
                    <button className='formBtn' id='authorise' type="submit">Войти</button>
                </form>
                <div>
                    {errorMessage && <div className="error-message">{errorMessage}</div>}
                </div>
            </div>
        </div>
    );
};

export default Authorisation;
