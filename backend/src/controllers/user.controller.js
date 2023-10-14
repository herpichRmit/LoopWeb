const db = require("../database");
const argon2 = require('argon2');

// Select all users from the database.
exports.all = async (req, res) => {
  const users = await db.user.findAll();

  res.json(users);
};

// Select one user from the database.
exports.one = async (req, res) => {
  const id = req.params.id;

  const user = await db.user.findByPk(id);

  res.json(user);
};

// Create a user in the database.
exports.create = async (req, res) => {
  const user = await db.user.create({
    first_name: req.body.firstName,
    last_name: req.body.lastName
  });

  return res.json(user);
};

// Update a user in the database.
exports.update = async (req, res) => {
  const id = req.params.id;

  const user = await db.user.findByPk(id);

  user.first_name = req.body.firstName;
  user.last_name = req.body.lastName;

  await user.save();

  return res.json(user);
};

// Remove a user from the database.
exports.remove = async (req, res) => {
  const id = req.params.id;

  let removed = false;

  const user = await db.user.findByPk(id);
  if(user !== null) {
    await user.destroy();
    removed = true;
  }

  return res.json(removed);
};

// Select one user from the database if username and password are a match
exports.login = async (req, res) => {
  const user = await db.user.findByPk(req.query.user_email);

  if (
    user === null ||
    (await argon2.verify(user.password_hash, req.query.password)) === false
  )
    res.json(null);
  else res.json(user);
};

// Select a user, and their reviews from the database.
exports.getReviewsByUserID = async (req, res) => {
  const id = req.params.id;

  const user = await db.user.findByPk(id, { include: ["reviews"] });

  return res.json(user);
};