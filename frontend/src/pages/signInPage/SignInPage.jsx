//import React from "react";
import React, { useState } from "react";
import './SignInPage.css';
import useForm from "../../components/common/form/useForm"
import validate from "../../components/common/form/LoginFormValidationRules";
//import userData from '../../data/old/users.json';
import { useNavigate } from 'react-router-dom';


// Ethan added ... 
import { verifyUser } from "../../data/repository";
import EditAccountModal from "../../components/editAccountModal/EditAccountModal";
import WelcomeModal from "./WelcomeModal";
// --

// import { useParams } from "react-router-dom";

function SignInPage ({ setIsLoggedIn }) {

    const navigate = useNavigate();
    
    const [user, setUser] = useState(null);
    const [showWelcomeModal, setShowWelcomeModal] = useState(false);

    const {
        values,
        errors,
        handleChange,
        handleSubmit
    } = useForm(signIn, validate);

    

    async function signIn() {
        // Maybe store user info so that they can edit their profile? and submit reviews with their profile

        //const user = {...values, isLoggedIn: true };

        //localStorage.setItem('currentUser', JSON.stringify(user));

        //const currUser = JSON.parse(localStorage.getItem('currentUser'));
        const { email, password } = values;

        try {
            const userData = await verifyUser(email, password);

            if (userData !== null) {
                setUser(userData);
                setIsLoggedIn(true);
                localStorage.setItem('isLoggedIn', 'true');
                
                // show welcome modal
                setShowWelcomeModal(true);
                
                // navigate to home page after successful login
                setTimeout(() => {
                    navigate('/');
                }, 2000);

                console.log("User Info:", userData)

            }
        } catch (error){
            console.error("Authentication failed:", error);
        }

        // const userFound = userData.find(user => user.email === email && user.password === password); // found in user.json file
        // const currUserFound = currUser && currUser.email === email && currUser.password === password; // found in local storage

        // // Ethan added ... this async function will call verifyUser which will call backend
        // // See week 8 practical practical code
        // //      const user = await verifyUser(fields.username, fields.password);
        // // --

        // if (currUserFound || userFound) {
        //     setIsLoggedIn(true);

        //     if (userFound) {
        //         localStorage.setItem('isLoggedIn', 'true');
        //     }
        // }


    }

    return (

        <div className="signIn-container">
            <div className="signIn-border-container">
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

                {showWelcomeModal && (
                <WelcomeModal user={user} isOpen={showWelcomeModal} onClose={() => setShowWelcomeModal(false)}/>
                )}
            </div>
        </div>
            
    );
}

export default SignInPage;