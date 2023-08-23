import React from "react";
import './Card.css';

/*
    
*/

function Card (props) {
    return (
        <>
            <div className="card-container">
                <div className="card-container_content">
                    <div className="card-container_content-img">
                        <img src={process.env.PUBLIC_URL + "/no_image.png"} alt=""></img>
                    </div>
                    <div className="card-container_content-textbox">
                        <p>{props.movie}</p>
                    </div>
                    <div className="card-container_content-button">
                        <a href="">Times & Tickets</a>
                    </div>
                </div>
                
            </div>
        </>
    )
}

export default Card;