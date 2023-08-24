import React from "react";
import './ReviewCard.css';

function ReviewCard (props) {
    return (
        <>
            <div className="reviewCard-container">
                <div className="reviewCard-container_box">
                    <div className="reviewCard-container_box-row">
                        <div className="reviewCard-container_box-row_title">
                            <h3>{props.headline}</h3>
                        </div>
                        <div className="reviewCard-container_box-row_number">
                            <h1>{props.rating}</h1>
                        </div>
                    </div>
                    <div className="reviewCard-container_box-reviewer">
                        <p>{props.author}</p>
                    </div>
                    <div className="reviewCard-container_box-review">
                        <p>{props.desc}</p>
                    </div>
                    
                </div>
            </div>
        </>
    )
}

export default ReviewCard;