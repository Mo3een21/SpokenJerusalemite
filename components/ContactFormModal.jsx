import React from 'react';

export default function ContactFormModal({ isOpen, onClose, children }) {
    if (!isOpen) return null;

    return (
        <div className="contact-modal-overlay">
            <div className="contact-modal-content">
                 <button className="contact-close-button" onClick={onClose}>&times;</button>
                {children}
            </div>
        </div>
    );
}
