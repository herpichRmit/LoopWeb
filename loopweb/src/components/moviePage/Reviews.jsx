import React from "react";
import { Card } from '../common';
import './Reviews.css';


function Reviews () {
    return (
        <>
            <div className="reviews-container">
                <div className="reviews-container_box">
                    <div className="reviews-container_box-row">
                        <div className="reviews-container_box-row_title">
                            <h1>Reviews</h1>
                        </div>
                        <div className="screeningTimes-container_box-row_button">
                            <button>Add review</button>
                        </div>
                    </div>
                    <div className="reviews-container_box-flexGrid">
                        
                    </div>
                </div>
            </div>
        </>
    )
}

export default Reviews;