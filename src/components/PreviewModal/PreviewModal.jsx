import React from 'react';
import './PreviewModal.css'; // Ensure you create the CSS file

const PreviewModal = ({ isOpen, onClose, imageSrc, title, children }) => {
    console.log("PreviewModal")
    if (!isOpen) return null;

    return (
      <div className="modal" onClick={onClose}>
        <div className="modal-content zoom-out" onClick={(e) => e.stopPropagation()}>
          <img src={imageSrc} alt="Modal Visual" className="modal-image" />
          <div className="modal-body">
            <h2>{title}</h2>
            <p>{children}</p>
            <button className="close-modal" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };
export default PreviewModal;