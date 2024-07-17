// components/ListModal.js
import React from 'react';

const ListModal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="list-modal-overlay">
            <div className="list-modal-content">
                <button className="list-close-button" onClick={onClose}>×</button>
                {children}
            </div>
        </div>
    );
};

export default ListModal;
