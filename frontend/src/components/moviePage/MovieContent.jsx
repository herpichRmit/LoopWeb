import React from "react";
import './MovieContent.css';


function MovieContent (props) {

    // No calculations or state, all props

    return (
        <>
            <div className="movieContent-container">
                <div className="movieContent-container_space">
                    <img src={process.env.PUBLIC_URL + "/landing_banner_unsplash.jpg"} alt="" width="2912" height="4368"></img>
                </div>
                <div className="movieContent-container_imageBlockRow">
                    <div className="movieContent-container_imageBlockRow-graphic">
                        <img src={process.env.PUBLIC_URL + props.movie.img} alt=""></img>
                    </div>
                    <div className="movieContent-container_imageBlockRow-infoBlock">
                        <div className="movieContent-container_imageBlockRow-infoBlock-title">
                            <h1>{props.movie.title}</h1>
                        </div>
                        <div className="movieContent-container_imageBlockRow-infoBlock-annotation">
                            <p>View cinemas below for session times.</p>
                        </div>
                        <div className="movieContent-container_imageBlockRow-infoBlock-description">
                            <p>{props.movie.desc}</p>
                        </div>
                        <div className="movieContent-container_imageBlockRow-infoBlock-detail">
                            <div className="movieContent-container_imageBlockRow-infoBlock-detail_left">
                                <p>Release date: </p>
                                <p>Running time: </p>
                                <p>Director: </p>
                                <p>Cast: </p>
                            </div>
                            <div className="movieContent-container_imageBlockRow-infoBlock-detail_right">
                                <p>{props.movie.release}</p>
                                <p>{props.movie.runtime}</p>
                                <p>{props.movie.director}</p>
                                <p>{props.movie.cast}</p>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default MovieContent;