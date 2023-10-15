import React, { useState, useEffect } from "react";
import './ReviewCard.css';
import { TextField } from '@mui/material';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles
import moment from 'moment';

import { updateReview, removeReview } from "../../data/repository";

import { useParams } from 'react-router-dom';
import { getMovie } from "../../data/repository";

function ReviewCard (props) {
    const [isEditing, setIsEditing] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [reviews, setReviews] = useState([]);

    const [comment, setComment] = useState(props.comment);
    const [rating, setRating] = useState(props.rating);
    const [headline, setHeadline] = useState(props.headline);

    const { movieId } = useParams();

    function handleHeadline(e) {
        setHeadline(e.target.value)
    }

    function handleRating(e) {
        setRating(e.target.value)
    }

    const userData = JSON.parse(localStorage.getItem('user'))
    const isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn'))

    const postUpdateReview = async (event) => {
        event.preventDefault();
        // As React Quill uses HTML tags within the text the empty check first removes all HTML elements using a regex.
        if(comment.replace(/<(.|\n)*?>/g, "").trim().length === 0) {
            setErrorMessage("A post cannot be empty.");
            return;
        } else {
            // Update post.
            setErrorMessage("");
            const review = { rating: rating, headline: headline, comment: comment, post_date: props.post_date, user_email: userData.user_email, movie_id: movieId };
            console.log(props.review_id)
            await updateReview(props.review_id, review);

            // Update locally?.
            //setReviews([...reviews, newReview]);

            setIsEditing(false);
            refreshPage()
        }
    }

    const resetChanges = () => {
        setComment(props.comment);
        setRating(props.rating);
        setHeadline(props.headline);
        setIsEditing(false);
        setErrorMessage("");
    }

    const deleteReview = async () => {
        await removeReview(props.review_id)
        refreshPage()

    }

    function refreshPage() {
        window.location.reload(false);
      }


    return (
        <>
            <div className="reviewCard-container">
                <div className="reviewCard-container_box">
                    {isEditing ?
                        <div className="reviews-editor">
                            <form onSubmit={postUpdateReview} >
                            <h4>Edit review</h4>
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
                                InputLabelProps={{
                                    shrink: true,
                                    inputProps: { min: 0, max: 5 } 
                                }}
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
                            <div className="reviews-editor-buttons">
                                <button className="button-alt" onClick={postUpdateReview} >Save</button>
                                <button className="button-alt" onClick={deleteReview} >Delete</button>
                                <button className="button-alt" onClick={resetChanges} >Cancel</button>
                                {errorMessage !== null &&
                                <div>
                                    <span className="text-danger">{errorMessage}</span> 
                                </div>
                                }
                            </div>
                            </form>
                        </div>
                        :
                        <>
                            <div className="reviewCard-container_box-row">
                                <div className="reviewCard-container_box-row_title">
                                    <h3>{props.headline}</h3>
                                </div>
                                <div className="reviewCard-container_box-row_number">
                                    <h3>{props.rating}</h3>
                                </div>
                            </div>
                            <div className="reviewCard-container_box-reviewer">
                                <p>{props.firstName + " "}{props.lastName}</p>
                            </div>
                            <div className="reviewCard-container_box-reviewer">
                                <p>{moment(props.post_date).format('MMMM Do YYYY, h:mma')}</p>
                            </div>
                            <br></br>
                            <div className="reviewCard-container_box-review">
                                <div dangerouslySetInnerHTML={{__html: props.comment}}>{}</div>
                            </div>
                            <br></br>
                            {props.edit && 
                                <div className="reviewCard-container_box-review">
                                    <button className="button-alt" onClick={() => {setIsEditing(true)}} >Edit</button>
                                </div>
                            }
                        </>
                    }
                    
                </div>
            </div>
        </>
    )
}

export default ReviewCard;