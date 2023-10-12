import React from "react";
import './Card.css';

import { Link } from 'react-router-dom';


function Card (props) {
    
    return (
        <>
            <div className="card-container">
                <div className="card-container_content">
                    <div className="card-container_content-img">
                        <img src={process.env.PUBLIC_URL + props.movie.img} alt=""></img>
                    </div>
                    <div className="card-container_content-textbox">
                        <p>{props.movie.title}</p>
                    </div>
                    {props.buttonActive && <div className="card-container_content-button">
                        <Link to={`/movies/${props.movie.movie_id}`} activeClassName="active" >
                            Times & Tickets
                        </Link>
                        </div>}
                    
                </div>
                
            </div>
        </>
    )
}

export default Card;