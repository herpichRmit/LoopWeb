import React, { useState } from "react";
import './Header.css';
import { NavLink } from "react-router-dom";
import EditAccountModal from "../../editAccountModal/EditAccountModal";

function Header({ isLoggedIn }) {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const currUser = JSON.parse(localStorage.getItem('user'))

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleClosedModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <div className="header">
                <div className="header-container">
                    <div className="header-container_content">
                        <div className="header-container_content-logo">
                            Loop web
                        </div>
                        <div className="header-container_content-navigation">
                            <NavLink to="/" exact>Home</NavLink>
                        </div>
                    </div>
                    <div className="header-container_navigationActions">
                        {isLoggedIn ? (
                            <div>
                                <button onClick={handleOpenModal}>
                                    Edit Account
                                </button>
                                <EditAccountModal user={currUser} isOpen={isModalOpen} onClose={handleClosedModal} />
                            </div>
                        ) : (
                            <div>
                                <NavLink to="/signIn" className="button-black">Sign In</NavLink>
                                <NavLink to="/signUp" >Sign Up</NavLink>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header;