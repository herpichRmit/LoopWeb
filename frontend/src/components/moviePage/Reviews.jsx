import React, { useState, useEffect } from "react";
import './Reviews.css';
import { ReviewCard } from '.' ;
import { TextField } from '@mui/material';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles
import { useNavigate } from "react-router-dom";

import { getReviews, createReview, getUser } from "../../data/repository";

import { useParams } from 'react-router-dom';
import { getMovie } from "../../data/repository";

function Reviews (props) {

    const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [reviews, setReviews] = useState([]);

    const [isLoading, setIsLoading] = useState(true);
    const [movie, setMovie] = useState([]);

    const [comment, setComment] = useState([]);
    const [rating, setRating] = useState(0);
    const [headline, setHeadline] = useState("");

    const { movieId } = useParams();

    function handleHeadline(e) {
        setHeadline(e.target.value)
    }

    function handleRating(e) {
        setRating(e.target.value)
    }

    // use useParams to get a movie
    useEffect(() => {
        async function loadMovie() {
            
            const movie = await getMovie(movieId); // get all movies // Todo: change to get reviews

            setMovie(movie)
            console.log(movie.reviews)
            setReviews(movie.reviews)

            setIsLoading(false);
            }

        loadMovie();
        findAvgReview()
    }, []);

    // gets current user from local host 

    const userData = JSON.parse(localStorage.getItem('user'))

    const isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn'))

    //if (userData == null) {

    //}

    // create review
    const resetReviewContent = () => {
        setComment("");
        setRating(0);
        setHeadline("");
        setErrorMessage(null);
        setIsOpen(false)
      }
    
    const submitReview = async (event) => {
        event.preventDefault();

        // As React Quill uses HTML tags within the text the empty check first removes all HTML elements using a regex.
        if(comment.replace(/<(.|\n)*?>/g, "").trim().length === 0) {
            setErrorMessage("A post cannot be empty.");
            return;
        } else {
            // Create post.
            const newReview = { rating: rating, headline: headline, comment: comment, post_date: new Date(), user_email: userData.user_email, movie_id: movieId };
            await createReview(newReview);

            // Add post to locally stored posts.
            setReviews([...reviews, newReview]);

            resetReviewContent();
            refreshPage();
        }
    };

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

        let result = sum/num
        setAvgReview(parseFloat(result.toFixed(1)))
    }

    // todo: find better solution
    function refreshPage() {
        window.location.reload(false);
    }
    

    return (
        <>  
            <div className="reviews-container">
                <div className="reviews-container_box">
                    <div className="reviews-container_box-row">
                        <div className="reviews-container_box-row_title">
                            <h2>Reviews</h2>
                        </div>
                        <div className="reviews-container_box-row_rating">
                            <h4>Rating:</h4>
                            <h4>{avgReview}</h4>
                            <h4>/5</h4>
                        </div>
                        <div className="screeningTimes-container_box-row_button">
                            {isLoggedIn ? <button className="button-alt" onClick={() => setIsOpen(true)}>Add review</button> : <button style={{ backgroundColor: 'grey', cursor:'default', borderColor: 'grey' }}  className="button-alt" >Add review</button> } 
                        </div>
                    </div>
                    {isOpen ?
                        <div className="reviews-editor_size">
                            <div className="reviews-editor">
                                <form onSubmit={submitReview} >
                                <h4>Add review</h4>
                                <TextField
                                    className="reviews-editor-textf"
                                    required
                                    label="Headline"
                                    type="text"
                                    value={headline}
                                    onChange={handleHeadline}
                                />
                                <br></br>
                                <TextField
                                    className="reviews-editor-textf"
                                    label="Rating out of 5"
                                    type="number"
                                    value={rating}
                                    onChange={handleRating}
                                />
                                <ReactQuill
                                    className="reviews-editor-box"
                                    value={comment}
                                    onChange={setComment}
                                    modules={{
                                        toolbar: [
                                        [{ header: [1, 2, false] }],
                                        ['bold', 'italic', 'underline']
                                        ]
                                    }}
                                    theme="snow"
                                />
                                {errorMessage !== null &&
                                    <div>
                                        <span className="text-danger">{errorMessage}</span>
                                    </div>
                                }
                                <div className="reviews-editor-buttons">
                                    <button className="button-alt" onClick={submitReview} >Save</button>
                                    <button className="button-alt" onClick={resetReviewContent} >Cancel</button>
                                    {errorMessage !== null &&
                                    <div>
                                        <span className="text-danger">{errorMessage}</span> 
                                    </div>
                                    }
                                </div>
                                </form>
                            </div>
                        </div>
                        :
                        <div></div>
                    }
                    
                    {isLoading ? 
                        <div>Loading reviews</div>
                        :
                        <div className="reviews-container_box-flexGrid">{
                            reviews.map(review => {
                                // checks if this review is the user, if so enables an edit button to be visible
                                let userEdit = false;
                                
                                if (userData != null){
                                    if (review.user_email == userData.user_email){
                                        userEdit = true;
                                    }
                                }
                                

                                
                                return <ReviewCard 
                                    review_id={review.review_id}
                                    headline={review.headline} 
                                    firstName={review.user != null ? review.user.first_name : "" } 
                                    lastName={review.user != null ? review.user.last_name : "" } 
                                    comment={review.comment} 
                                    post_date={review.post_date} 
                                    rating={review.rating} 
                                    edit={userEdit}
                                />
                            })
                        }</div>
                    }

                    

                </div>
            </div>
        </>
    )
}

export default Reviews;
