import React, { useState } from 'react'

const EditReviewForm = (props) => {
  const [review, setReview] = useState(props.currentReview)


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
        
        props.updateReview(review.title, review)
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
      <button onClick={() => {
        props.setEditing(false);
        props.setIsOpen(false);
        }}>Cancel</button>
      <button onClick={() => props.deleteReview(review.title)}>Delete</button>
      <button type="button" onClick={props.setIsOpen}> save</button>
      <button type="submit">Update review</button>

  </form>
  )

  //
  // <button onClick={() => props.editReview(review)}>Edit</button>
}

export default EditReviewForm