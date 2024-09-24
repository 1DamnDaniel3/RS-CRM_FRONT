import React from 'react';
import ReactDOM from 'react-dom';
import './styles/createClient.css'; // Добавьте стили для вашего портала

const CreateClientPortal = ({ children, isOpen, onClose }) => {
    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <div className="portalOverlay">
            <div className="portalContent">
                <button className="closeBtn" onClick={onClose}>
                    &times;
                </button>
                {children}
            </div>
        </div>,
        document.getElementById('portal-root') // Убедитесь, что этот элемент существует в вашем HTML
    );
};

export default CreateClientPortal;
