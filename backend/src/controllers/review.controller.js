const db = require("../database");

// Select all reviews from the database.
exports.all = async (req, res) => {
  const reviews = await db.review.findAll();

  res.json(reviews);
};

// Select one review from the database.
exports.one = async (req, res) => {
  const id = req.params.id;

  const review = await db.review.findByPk(id);

  res.json(review);
};

// Create a review in the database.
exports.create = async (req, res) => {
  const review = await db.review.create({
    rating: req.body.rating,
    headline: req.body.headline,
    comment: req.body.comment,
    post_date: req.body.post_date,
    user_email: req.body.user_email,
    movie_id: req.body.movie_id
  });

  return res.json(review);
};

// Update a review in the database.
exports.update = async (req, res) => {
  const id = req.params.id;

  const review = await db.review.findByPk(id);

  review.rating = req.body.rating;
  review.headline = req.body.headline;
  review.comment = req.body.comment;
  review.post_date = req.body.post_date;
  review.user_email = req.body.user_email;
  review.movie_id = req.body.movie_id;

  await review.save();

  return res.json(review);
};

// Remove a review from the database.
exports.remove = async (req, res) => {
  const id = req.params.id;

  let removed = false;

  const review = await db.review.findByPk(id);
  if(review !== null) {
    await review.destroy();
    removed = true;
  }

  return res.json(removed);
};


// Remove a review from the database.
exports.login = async (req, res) => {
  const id = req.params.id;

  let removed = false;

  const review = await db.review.findByPk(id);
  if(review !== null) {
    
  }

  return res.json(removed);
};