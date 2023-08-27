import React, { useState } from "react";
import './SignUpPage.css';
import useForm from "../../components/common/form/useForm"
import validate from "../../components/common/form/LoginFormValidationRules";
import { useNavigate } from 'react-router-dom';


// import { useParams } from "react-router-dom";

function SignUpPage ({ setIsLoggedIn }) {

    const navigate = useNavigate();

    const {
        values,
        errors,
        handleChange,
        handleSubmit
    } = useForm(signUp, validate);


    function signUp() {
        // Maybe store user info so that they can edit their profile? and submit reviews with their profile
        
        const user = values;

        localStorage.setItem('currentUser', JSON.stringify(user));

        setIsLoggedIn(true);

        navigate('/');


    }

    return (

        <div className="signUp-container">
            <form onSubmit={handleSubmit}>
                <div className="signUp-display_flex">
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
                    <button type="submit" className="button">Sign up</button>
                </div>
            </form>
        </div>
    );
}

export default SignUpPage;