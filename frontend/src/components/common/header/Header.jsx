import React, { useState, useEffect } from "react";
import './Header.css';
import { NavLink, useNavigate } from "react-router-dom";
import EditAccountModal from "../../editAccountModal/EditAccountModal";

function Header({ isLoggedIn, setIsLoggedIn }) {

    const navigate = useNavigate();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const currUser = JSON.parse(localStorage.getItem('user'))

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleClosedModal = () => {
        setIsModalOpen(false);
    };

    const handleLogout = () => {

        localStorage.setItem('isLoggedIn', 'false');
        localStorage.removeItem("user");
        setIsLoggedIn(false);
        window.location.reload();
        navigate('/');
    };

    useEffect(() => {
        // Check the isLoggedIn flag in local storage on component load
        const storedIsLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        setIsLoggedIn(storedIsLoggedIn);
    }, []);

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
                                <button onClick={handleLogout} className="button-black">
                                    Logout
                                </button>
                                <EditAccountModal user={currUser} isOpen={isModalOpen} onClose={handleClosedModal} />
                            </div>
                        ) : (
                            <div>
                                <NavLink to="/signIn" className="button-black">Sign In</NavLink>
                                <NavLink to="/signUp" className="button-black">Sign Up</NavLink>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header;