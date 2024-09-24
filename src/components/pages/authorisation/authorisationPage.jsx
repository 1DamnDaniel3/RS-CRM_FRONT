import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../../services/api';
import styles from './authorisationPage.module.css'; // Импорт CSS модуля
import { AuthContext } from '../../../context/AuthContext';

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
                const firstAuthenticate = await api.get('/authenticateUser', { withCredentials: true });
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
        <div className={styles.authorisationContainer}>
            <div className={styles.authorisationWindow}>
                <form onSubmit={handleSubmit}>
                    <input type="email" name="email" placeholder="Email" onChange={handleChange} />
                    <div className={styles.passwordContainer}>
                        <input id={styles.passwordField} type={inputType} name="password" placeholder="Password" onChange={handleChange} />
                        <button className={styles.formBtn} id={styles.ShowBtn} type='button' onClick={togglePasswordVisibility}>
                            {inputType === 'password' ? 'Показать' : 'Скрыть'}
                        </button>
                    </div>
                    <button className={styles.formBtn} id={styles.authorise} type="submit">Войти</button>
                </form>
                <div>
                    {errorMessage && <div className={styles.errorMessage}>{errorMessage}</div>}
                </div>
            </div>
        </div>
    );
};

export default Authorisation;
