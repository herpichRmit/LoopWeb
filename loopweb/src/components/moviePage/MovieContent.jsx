import React from "react";
import './MovieContent.css';


function MovieContent () {
    return (
        <>
            <div className="movieContent-container">
                <div className="movieContent-container_space">
                    <p></p>
                </div>
                <div className="movieContent-container_imageBlockRow">
                    <div className="movieContent-container_imageBlockRow-graphic">
                        <img src={process.env.PUBLIC_URL + "/no_image.png"} alt=""></img>
                    </div>
                    <div className="movieContent-container_imageBlockRow-infoBlock">
                        <div className="movieContent-container_imageBlockRow-infoBlock-title">
                            <h1>Movie Title Here</h1>
                        </div>
                        <div className="movieContent-container_imageBlockRow-infoBlock-annotation">
                            <p>Annotation</p>
                        </div>
                        <div className="movieContent-container_imageBlockRow-infoBlock-description">
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus posuere, augue et maximus tincidunt, ex nisi gravida lacus, sit amet aliquet augue nisi porttitor lacus. Quisque vulputate dolor ac facilisis volutpat. Donec quis enim gravida, consequat diam vel, consectetur ante. Mauris dignissim massa tincidunt velit porta, non euismod ligula porttitor. Fusce vitae accumsan metus. Suspendisse consequat diam lacinia lacus eleifend maximus. Curabitur ut dapibus massa. Donec ut volutpat diam. Aenean gravida maximus aliquam. Phasellus suscipit eleifend orci, vitae laoreet purus ultricies vitae. Ut non volutpat augue. Vivamus accumsan nibh eu euismod maximus. Vivamus euismod, est nec accumsan scelerisque, mi tellus volutpat nulla, et rhoncus orci velit quis ex.</p>
                        </div>
                        <div className="movieContent-container_imageBlockRow-infoBlock-detail">
                            <div className="movieContent-container_imageBlockRow-infoBlock-detail_left">
                                <p>Release Date: </p>
                                <p>Running Time: </p>
                                <p>Director: </p>
                                <p>Cast: </p>
                            </div>
                            <div className="movieContent-container_imageBlockRow-infoBlock-detail_right">
                                <p>xx/xx/xxx  </p>
                                <p>xx mins </p>
                                <p>John Smith </p>
                                <p>Jane Doe, John Smith</p>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default MovieContent;