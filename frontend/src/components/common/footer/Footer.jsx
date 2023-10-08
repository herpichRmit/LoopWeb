import React from "react";
import './Footer.css';


function Footer () {
    return (
        <>
            <div className="footer">
                <div className="footer-container">
                    <div className="footer-container_content">
                        <div className="footer-container_content-logo">
                            Loop web
                        </div>
                        <div className="footer-container_content-navigation">
                            <a href="#" >Contact</a> 
                            <a href="#" >About us</a>
                        </div>
                        <div className="footer-container_content-footnote">
                            <p href="#" >&#169; 2023 Loop Web</p> 
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer;