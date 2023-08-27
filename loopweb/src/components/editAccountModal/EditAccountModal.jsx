import React from 'react';
import Modal from '@mui/material/Modal';

const EditAccountModal = ({ user, isOpen, onClose }) => {
    return (
        <Modal open={isOpen} onClose={onClose}>
            <div className="modal-content">
                <h2>User Information</h2>
                <p>Name: {user.name}</p>
                <p>Email: {user.email}</p>
                <p>Account Created: {user.createdAt}</p>
            </div>
        </Modal>
    );
};

export default EditAccountModal;