import React from 'react';
import Modal from '@mui/material/Modal';
import { NavLink } from 'react-router-dom';

const EditAccountModal = ({ user, isOpen, onClose }) => {

    const modalStyle = {
        position: 'fixed',
        top: '10%', // Adjust this value to control the vertical position
        right: '20%', // Adjust this value to control the horizontal position
        backgroundColor: 'white',
        padding: '20px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        borderRadius: '8px',
    };

    return (
        <Modal open={isOpen} onClose={onClose}>
            <div style={modalStyle} className="modal-content">
                <h2>User Information</h2>
                {user ? ( // Check if user is defined
                    <>
                        <p>Name: {user.first_name}</p>
                        <p>Email: {user.user_email}</p>
                        <p>Account Created: {user.join_date}</p>
                        <NavLink to='/edit'><button>Edit details</button></NavLink>
                    </>
                ) : (
                    <p>No user information available.</p>
                )}
            </div>
        </Modal>
    );
};


export default EditAccountModal;