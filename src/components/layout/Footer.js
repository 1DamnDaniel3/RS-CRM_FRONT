import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import './styles/footer.css'

const Footer = () => {
    return(
        <footer>
            <div className='groupsCountainer'>
                <button className='addGroupBtn'>+</button>
            </div>
        </footer>
    )
};

export default Footer;