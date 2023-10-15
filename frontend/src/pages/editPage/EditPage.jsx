import React, { useState, useEffect } from "react";
import './EditPage.css';
import useForm from "../../components/common/form/useForm"
import validate from "../../components/common/form/LoginFormValidationRules";
import { useNavigate } from 'react-router-dom';


import { findUser, updateUser } from "../../data/repository"; 


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

    const postUpdateUser = async (event) => {
        event.preventDefault();

        // get user from local host
        const userData = JSON.parse(localStorage.getItem('user'))

        // Update post.
        let newUser = await findUser(userData.user_email)
        newUser = { user_email: newUser.user_email, first_name: values.firstName, last_name: values.lastName, password_hash: values.password, join_date: newUser.join_date };
        await updateUser(newUser.user_email, newUser);

        // Update locally
        localStorage.setItem('user', JSON.stringify(newUser));
    }

    const {
        values,
        errors,
        handleChange,
        handleSubmit
    } = useForm(postUpdateUser, validate);






    function removeUser() {
        
        const user = values;

        localStorage.removeItem("currentUser");

        setIsLoggedIn(false);

        navigate('/');

    }


    /*

    <div className="field">
                        <label className="label">Last Name</label>
                        <div className="control">
                            <input className={`input ${errors.name && 'is-danger'}`} type="text" name="name" onChange={handleChange} value={values.lastName || ''} required />
                        </div>
                    </div>

                    */
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
                        <label className="label">First name</label>
                        <div className="control">
                            <input className={`input ${errors.name && 'is-danger'}`} type="text" name="firstName" onChange={handleChange} value={values.firstName || ''} />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Last name</label>
                        <div className="control">
                            <input className={`input ${errors.name && 'is-danger'}`} type="text" name="lastName" onChange={handleChange} value={values.lastName || ''} />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Password</label>
                        <div className="control">
                            <input className={`input ${errors.password && 'is-danger'}`} type="password" name="password" onChange={handleChange} value={values.password || ''} />
                        </div>
                        {errors.password && (
                            <p className="help is-danger">{errors.password}</p>
                        )}
                    </div>
                    <button onClick={removeUser}>Delete account</button>
                    <button type="submit" onClick={postUpdateUser} className="button">Save</button>
                    
                </div>
            </form>
        </div>
    );
}

export default EditPage;