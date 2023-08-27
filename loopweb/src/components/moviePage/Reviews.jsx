import React, { useState } from "react";
import ReactModal from 'react-modal';
import './Reviews.css';
import { ReviewCard } from '../moviePage' ;
import { TextField } from "@mui/material";
import { v4 as uuidv4 } from 'uuid';
import AddReviewForm from "./ReviewForm";
import EditReviewForm from "./ReviewEditForm";

function Reviews (props) {
    const [isOpen, setIsOpen] = useState(false);
    const [editing, setEditing] = useState(false)
    

    const initialFormState = { title: '', reviewer: 'John Smith', desc: '', rating: 0}
    const [currentReview, setCurrentReview] = useState(initialFormState)


    const [reviews, setReviews] = useState(props.reviews)

    const sumbitReview = (review) => {
        setReviews([...reviews, review])
        console.log("success")
        console.log(reviews)
    }

    const deleteReview = (title) => {
        setReviews(reviews.filter((review) => review.title !== title))
        console.log("deleting")
        console.log(reviews)
    }


    const editReview = (review) => {
    setEditing(true)
    
    setCurrentReview({ title: review.title, reviewer: review.reviewer, desc: review.desc, rating: review.rating})
    }


    const updateReview = (title, updatedReview) => {
        setEditing(false)
      
        setReviews(reviews.map((review) => (review.title === title ? updatedReview : review)))
      }

    
    const cards = reviews.map(review => {
        let userEdit = false;

        if (review.reviewer == "John Smith"){
            userEdit = true;
        }

        return <ReviewCard 
            //parentFunction={setData}
            headline={review.title} 
            author={review.reviewer} 
            desc={review.desc} 
            rating={review.rating} 
            edit={userEdit}
            review={review}
            editReview={editReview}
            setIsOpen={setIsOpen}
        />
    })

    // cards should have a button that setsIsOpen to true (like 76) and also turns editing on

    return (
        <>
            <div className="reviews-container">
                <div className="reviews-container_box">
                    <div className="reviews-container_box-row">
                        <div className="reviews-container_box-row_title">
                            <h2>Reviews</h2>
                        </div>
                        <div className="screeningTimes-container_box-row_button">
                            <button onClick={() => setIsOpen(true)}>Add review</button>
                        </div>
                    </div>
                    <div className="reviews-container_box-flexGrid">
                        {cards}
                    </div>

                    <ReactModal 
                        className="reviewModal"
                        isOpen={isOpen} 
                        contentLabel="Example Modal" 
                        onRequestClose={() => setIsOpen(false)}
                    >
                        {editing ? (
                             <EditReviewForm setEditing={setEditing} currentReview={currentReview} updateReview={updateReview} setIsOpen={setIsOpen} />
                        ) : (
                            <AddReviewForm submitReview={sumbitReview} deleteReview={deleteReview} editReview={editReview} setIsOpen={setIsOpen} />
                        )}
                    </ReactModal>

                </div>
            </div>
        </>
    )
}

export default Reviews;