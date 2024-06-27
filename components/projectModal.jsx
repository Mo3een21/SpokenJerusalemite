"use client";

import React from 'react';

const ProjectModal = ({ show, onClose, project }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>{project.title}</h2>
        <p>{project.description}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default ProjectModal;
