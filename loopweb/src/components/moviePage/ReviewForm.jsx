import React, { useState } from 'react'
import { TextField } from '@mui/material';
import './ReviewForm.css';

const AddReviewForm = (props) => {

  const initialFormState = {id: null, title: '', reviewer: props.username, desc: '', rating: 0}
  const [review, setReview] = useState(initialFormState)


  const handleInputChange = (event) => {
    const { name, value } = event.target
  
    setReview({ ...review, [name]: value })
  }


  return (
      <form
        onSubmit={(event) => {
          event.preventDefault()

          console.log("submitted")
          console.log(review)

          if (!review.title || !review.desc) return
          
          props.submitReview(review)
          setReview(initialFormState)
          props.setIsOpen(false)
        }}
      >
        <div className="modal-form">
          <h2>Add Review</h2>
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
            <button onClick={() => props.setIsOpen(false)}>Cancel</button>
            <button type="submit">Add new review</button>
          </div>
        </div>
    </form>
  )
}

export default AddReviewForm