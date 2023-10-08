//import React from "react";
import React, { useState } from "react";
import './SignInPage.css';
import useForm from "../../components/common/form/useForm"
import validate from "../../components/common/form/LoginFormValidationRules";
import userData from '../../data/users.json';
import { useNavigate } from 'react-router-dom';

// import { useParams } from "react-router-dom";

function SignInPage ({ setIsLoggedIn }) {

    const {
        values,
        errors,
        handleChange,
        handleSubmit
    } = useForm(signIn, validate);

    const navigate = useNavigate();

    function signIn() {
        // Maybe store user info so that they can edit their profile? and submit reviews with their profile

        //const user = {...values, isLoggedIn: true };

        //localStorage.setItem('currentUser', JSON.stringify(user));

        const currUser = JSON.parse(localStorage.getItem('currentUser'));
        const { email, password } = values;

        const userFound = userData.find(user => user.email === email && user.password === password); // found in user.json file
        const currUserFound = currUser && currUser.email === email && currUser.password === password; // found in local storage

        if (currUserFound || userFound) {
            setIsLoggedIn(true);

            if (userFound) {
                localStorage.setItem('isLoggedIn', 'true');
            }
        }
        
        

        navigate('/');

    }

    return (

        <div className="signIn-container">
            <form onSubmit={handleSubmit}>
                <div className="signIn-display_flex">
                    <div className="field">
                        <label className="label">Email Address</label>
                        <div className="control">
                            <input className={`input ${errors.email && 'is-danger'}`} type="email" name="email" onChange={handleChange} value={values.email || ''} required />
                        </div>
                        {errors.email && (
                        <p className="help is-danger">{errors.email}</p>
                    )}
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
                    <button type="submit" className="button">Login</button>
                </div>
            </form>
        </div>
    );
}

export default SignInPage;