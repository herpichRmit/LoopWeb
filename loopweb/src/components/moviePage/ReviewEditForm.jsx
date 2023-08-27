import React, { useState } from 'react';
import { TextField } from '@mui/material';
import './ReviewForm.css';

const EditReviewForm = (props) => {
  const [review, setReview] = useState(props.currentReview)


  const handleInputChange = (event) => {
    const { name, value } = event.target

    console.log()
  
    setReview({ ...review, [name]: value })
  }


  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()
        
        props.updateReview(review.id, review)
        props.setIsOpen(false)
      }}
    >
      <div className="modal-form">
          <h2>Edit Review</h2>
          <TextField
              required
              label="Title"
              type="text"
              name="title"
              value={review.title}
              onChange={handleInputChange}
          />
          <TextField
              disabled
              label="Reviewer"
              type="text"
              name="reviewer"
              value={review.reviewer}
              onChange={handleInputChange}
          />
          <TextField
              label="Rating out of 5"
              type="number"
              name="rating"
              value={review.rating}
              InputLabelProps={{
                shrink: true,
                inputProps: { min: 0, max: 5 } 
              }}
              onChange={handleInputChange}
          />
          <TextField
              required
              label="Review"
              type="text"
              name="desc"
              value={review.desc}
              onChange={handleInputChange}
              multiline
              rows={4}
          />

          <div className="buttonRow">
            <button onClick={() => {
              props.setEditing(false);
              props.setIsOpen(false);
            }}>Cancel</button>
            <button onClick={() => props.deleteReview(review.id)}>Delete</button>
            <button type="submit">Save</button>
          </div>
        </div>


  </form>
  )

  //
  // <button onClick={() => props.editReview(review)}>Edit</button>
}

export default EditReviewForm