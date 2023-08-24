import React from "react";
import './Reviews.css';
import { ReviewCard } from '../moviePage' ;

function Reviews () {

    const data = [
        ["Headline","John Smith","Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus, voluptate aut a fugiat porro culpa dolores quos nulla vitae neque optio eius quae esse facilis repellat blanditiis vel, quia sequi.","1/5"],
        ["Another headline","John Smith","Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus, voluptate aut a fugiat porro culpa dolores quos nulla vitae neque optio eius quae esse facilis repellat blanditiis vel, quia sequi.","5/5"],
        ["Testing headline","John Smith","Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus, voluptate aut a fugiat porro culpa dolores quos nulla vitae neque optio eius quae esse facilis repellat blanditiis vel, quia sequi.","4/5"],
    ]

    const cards = data.map(review => {
        return <ReviewCard headline={review[0]} author={review[1]} desc={review[2]} rating={review[3]} />
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