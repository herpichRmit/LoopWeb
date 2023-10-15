import React from "react";
import Modal from '@mui/material/Modal';

const modalStyle = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#FF4742', // Red color
    color: 'white', // Text color
    padding: '20px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    borderRadius: '8px',
    width: '300px', // Adjust the width as needed
};

const textStyle = {
    fontSize: '22px', // Adjust the font size
    fontWeight: 'bold',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  };

function WelcomeModal({ user, isOpen, onClose }) {
  return (
    <Modal open={isOpen} onClose={onClose}>
        <div style={modalStyle} className="welcome-modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>
                &times;
                </span>
                <p style={textStyle}>Welcome, {user.first_name}!</p>
            </div>
        </div>
    </Modal>
    
  );
}

export default WelcomeModal;