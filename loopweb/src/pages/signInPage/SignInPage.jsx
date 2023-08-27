import React from "react";
import './SignInPage.css';
import useForm from "../../components/common/form/useForm"
import validate from "../../components/common/form/LoginFormValidationRules";

// import { useParams } from "react-router-dom";

function SignInPage () {

    const {
        values,
        errors,
        handleChange,
        handleSubmit
    } = useForm(signIn, validate);

    function signIn() {
        // Maybe store user info so that they can edit their profile? and submit reviews with their profile

        const user = {...values, isLoggedIn: true };

        localStorage.setItem('currentUser', JSON.stringify(user));
        localStorage.getItem(JSON.parse('currentUser'));


        
        setIsRegistered(true);

        navigate('/');

    }

    return (

        <div>
            <form onSubmit={handleSubmit}>
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
            </form>
        </div>
    );
}

export default SignInPage;