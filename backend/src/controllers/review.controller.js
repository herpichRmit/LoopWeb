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
    first_name: req.body.firstName,
    last_name: req.body.lastName
  });

  return res.json(review);
};

// Update a review in the database.
exports.update = async (req, res) => {
  const id = req.params.id;

  const review = await db.review.findByPk(id);

  review.first_name = req.body.firstName;
  review.last_name = req.body.lastName;

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