import React from "react";
import './Header.css';
import { NavLink } from "react-router-dom";

function Header () {
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
                        <NavLink to="/signIn" className="button_alternative">Sign In</NavLink>
                        {/*<button className="button_alternative">Sign in</button>
                        <button>Sign up</button> */}
                        <NavLink to="/signUp" className="button">Sign Up</NavLink>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header;