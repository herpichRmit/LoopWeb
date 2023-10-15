import React, { useState, useEffect } from "react";
import './EditPage.css';
import useForm from "../../components/common/form/useForm"
import validate from "../../components/common/form/LoginFormValidationRules";
import { useNavigate } from 'react-router-dom';

import { updateUser } from '../../data/repository';


// import { useParams } from "react-router-dom";

function EditPage ({ setIsLoggedIn }) {

    const navigate = useNavigate();
    //const [isDeleted, setIsDeleted] = useState(false);
    //const [formValues, setFormValues] = useState(currentUser);
    const [currentUser, setCurrentUser] = useState(null);

    

    useEffect(() => {
        // Retrieve 'currentUser' from local storage when the component mounts
        const storedUser = JSON.parse(localStorage.getItem('user'));
        setCurrentUser(storedUser); // Set 'currentUser' state
    }, []);

    const {
        values,
        errors,
        handleChange,
        handleSubmit
    } = useForm(editUser, validate);


    function editUser() {
        
        updateUser(currentUser.id, values)
            .then(updatedUser => {
                localStorage.setItem('currentUser', JSON.stringify(updatedUser));
                //setFormValues(updatedUser);
            })
            .catch(error => {
                console.error('Error updating user:', error);
            });

    }

    function removeUser() {
        
        const user = values;

        localStorage.removeItem("currentUser");

        setIsLoggedIn(false);

        navigate('/');

    }

    // if (isDeleted) {
    //     // If the user is deleted, you might want to redirect or display a message.
    //     return <div>User has been deleted.</div>;
    // }

    // delete account needs to remove an item from current user
    // turn is logged in off

    return (

        <div className="editPage-container">
            <form onSubmit={handleSubmit}>
                <div className="editPage-display_flex">
                    <div className="field">
                        <label className="label">Name</label>
                        <div className="control">
                            <input className={`input ${errors.name && 'is-danger'}`} type="text" name="name" onChange={handleChange} value={values.name || ''} required />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Email Address</label>
                        <div className="control">
                            <input className={`input ${errors.email && 'is-danger'}`} type="email" name="email" onChange={handleChange} value={values.email || ''} required />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Password</label>
                        <div className="control">
                            <input className={`input ${errors.password && 'is-danger'}`} type="password" name="password" onChange={handleChange} value={values.password || ''} required />
                        </div>
                        {errors.password && (
                            <p className="help is-danger">{errors.password}</p>
                        )}
                    </div>
                    <button onClick={removeUser}>Delete account</button>
                    <button type="submit" className="button">Sign up</button>
                    
                </div>
            </form>
        </div>
    );
}

export default EditPage;