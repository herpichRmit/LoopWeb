import React from "react";
import './Header.css';
import { NavLink } from "react-router-dom";

function Header({ isLoggedIn }) {
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
                            <NavLink to="/" exact>Screening Times</NavLink>
                        </div>
                    </div>
                    <div className="header-container_navigationActions">
                        {isLoggedIn ? (
                            <NavLink to="/signIn" className="button_alternative">Edit Account</NavLink>
                        ) : (
                            <div>
                                <NavLink to="/signIn" className="button_alternative">Sign In</NavLink>
                                <NavLink to="/signUp">
                                    <button>Sign Up</button>
                                </NavLink>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header;