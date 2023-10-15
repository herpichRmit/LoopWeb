import React, { useState } from "react";
import './EditPage.css';
import useForm from "../../components/common/form/useForm"
import validate from "../../components/common/form/LoginFormValidationRules";
import { useNavigate } from 'react-router-dom';

import { findUser, updateUser } from "../../data/repository"; 


// import { useParams } from "react-router-dom";

function EditPage ({ setIsLoggedIn }) {

    const navigate = useNavigate();

    const {
        values,
        errors,
        handleChange,
        handleSubmit
    } = useForm(editUser, validate);


    function editUser() {
        
        const user = values;

        localStorage.removeItem("currentUser");
        localStorage.setItem('currentUser', JSON.stringify(user));

        setIsLoggedIn(true);

        navigate('/');

    }

   

    
    function removeUser() {
        
        const user = values;

        localStorage.removeItem("currentUser");

        setIsLoggedIn(false);

        navigate('/');

    }

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