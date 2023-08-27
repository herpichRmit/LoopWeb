import React, { useState } from 'react'

const AddReviewForm = (props) => {

  const initialFormState = { title: '', reviewer: 'John Smith', desc: '', rating: 0}
  const [review, setReview] = useState(initialFormState)


  const handleInputChange = (event) => {
    const { name, value } = event.target

    console.log()
  
    setReview({ ...review, [name]: value })
  }

  /*
<TextField
          value={reviewTitle}
          label="Title"
          onChange={(e) => {
              setTitle(e.target.value);
          }}
      />
      <TextField
          value={reviewRating}
          label="Rating"
          onChange={(e) => {
              setRating(e.target.value);
          }}
      />
      <TextField
          value={reviewDesc}
          label="Review"
          onChange={(e) => {
              setReview(e.target.value);
          }}
          multiline
          rows={4}
      />
      <div className="reviewModal-button">
          <button onClick={() => setIsOpen(false)}>Close</button>
          <button onClick={() => {
              sumbitReview();
          }}>Add</button>
      </div>

  */

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
      <label>Title</label>
      <input
        type="text"
        name="title"
        value={review.title}
        onChange={handleInputChange}
      />
      <label>Reviewer</label>
      <input
        type="text"
        name="reviewer"
        value={review.reviewer}
        onChange={handleInputChange}
      />
      <label>Desc</label>
      <input
        type="text"
        name="desc"
        value={review.desc}
        onChange={handleInputChange}
      />
      <label>Rating</label>
      <input
        type="text"
        name="rating"
        value={review.rating}
        onChange={handleInputChange}
      />
      
      <button onClick={() => props.setIsOpen(false)}>Cancel</button>
      <button type="submit">Add new user</button>

  </form>
  )
  // <button onClick={() => props.deleteReview(review.title)}>Delete</button>
  // <button type="button" onClick={props.setIsOpen}> save</button>
  // <button onClick={() => props.editReview(review)}>Edit</button>
}

export default AddReviewForm