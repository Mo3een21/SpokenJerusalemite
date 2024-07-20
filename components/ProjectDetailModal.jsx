import React from 'react';

const ProjectDetailModal = ({ show, onClose, project }) => {
    if (!show) return null;

    return (
        <div className="project-detail-modal-overlay">
            <div className="project-detail-modal-content">
                <button className="project-detail-close-button" onClick={onClose}>
                    &times;
                </button>
                <h2>{project.title}</h2>
                <p>{project.description}</p>
                {/* <button className="project-detail-close-button" onClick={onClose}/> */}
            </div>
        </div>
    );
};

export default ProjectDetailModal;
