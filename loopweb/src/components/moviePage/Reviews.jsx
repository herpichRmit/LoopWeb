import React, { useState } from "react";
import ReactModal from 'react-modal';
import './Reviews.css';
import { ReviewCard } from '../moviePage' ;
import AddReviewForm from "./ReviewForm";
import EditReviewForm from "./ReviewEditForm";

function Reviews (props) {

    // track modal settings, i.e. when it is open and what modal is shown
    const [isOpen, setIsOpen] = useState(false);
    const [editing, setEditing] = useState(false)
    
    // username is used to allow user to edit there reviews

    const userObj = localStorage.getItem(JSON.parse('currentUser'));
    const username = "John Doe" // TODO: change to whoever logs in userObj.name

    // set initialFormState, used to set the current review so that current review can be edited
    const initialFormState = {id: null, title: '', reviewer: username, desc: '', rating: 0}
    const [currentReview, setCurrentReview] = useState(initialFormState)

    // access reviews state value, used in other functions
    const [reviews, setReviews] = useState(props.reviews)

    // adds new review to existing reviews object
    const sumbitReview = (review) => {
        review.id = reviews + 1
        setReviews([...reviews, review])
    }

    // searchs for a review by ID then removes it from reviews object
    const deleteReview = (id) => {
        setReviews(reviews.filter((review) => review.id !== id))
    }

    // sets a review to current review, in order for existing values to be based into edit modal screen
    const editReview = (review) => {
    setEditing(true)
    
    setCurrentReview({id: review.id, title: review.title, reviewer: review.reviewer, desc: review.desc, rating: review.rating})
    }

    // search and update review details by its ID number
    const updateReview = (id, updatedReview) => {
        setEditing(false)
      
        setReviews(reviews.map((review) => (review.id === id ? updatedReview : review)))
      }


    // update the avgReview state value
    const [avgReview, setAvgReview] = useState();

    // function to determine the average rating
    const findAvgReview = () => {
        let sum = 0
        let num = reviews.length

        for (let i=0; i<num; i++) {
            console.log(reviews[i].rating)
            sum += reviews[i].rating
        }

        console.log(userObj)

        let result = sum/num
        setAvgReview(parseFloat(result.toFixed(1)))
    }

    // maps review object to review cards
    const cards = reviews.map(review => {

        // checks if this review is the user, if so enables an edit button to be visible
        let userEdit = false;
        if (review.reviewer == username){
            userEdit = true;
        }

        return <ReviewCard 
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

    return (
        <>
            <div className="reviews-container">
                <div className="reviews-container_box">
                    <div className="reviews-container_box-row">
                        <div className="reviews-container_box-row_title">
                            <h2>Reviews</h2>
                        </div>
                        <div className="reviews-container_box-row_rating">
                            <h3>Average rating:</h3>
                            <h3>{avgReview}</h3>
                            <h3>/10</h3>
                            
                        </div>
                        <div>
                            <button onClick={findAvgReview}>Calculate</button>
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
                        onRequestClose={() => {
                            setIsOpen(false);
                            setEditing(false);
                        }}
                    >
                        {editing ? (
                             <EditReviewForm setEditing={setEditing} currentReview={currentReview} deleteReview={deleteReview} editReview={editReview} updateReview={updateReview} setIsOpen={setIsOpen} />
                        ) : (
                            <AddReviewForm submitReview={sumbitReview} setIsOpen={setIsOpen} username={username} />
                        )}
                    </ReactModal>

                </div>
            </div>
        </>
    )
}

export default Reviews;