import React from "react";
import './Reviews.css';
import { ReviewCard } from '../moviePage' ;

function Reviews (props) {

    const cards = props.reviews.map(review => {
        return <ReviewCard headline={review.title} author={review.name} desc={review.review} rating={review.rating} />
    })


    return (
        <>
            <div className="reviews-container">
                <div className="reviews-container_box">
                    <div className="reviews-container_box-row">
                        <div className="reviews-container_box-row_title">
                            <h2>Reviews</h2>
                        </div>
                        <div className="screeningTimes-container_box-row_button">
                            <button>Add review</button>
                        </div>
                    </div>
                    <div className="reviews-container_box-flexGrid">
                        {cards}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Reviews;