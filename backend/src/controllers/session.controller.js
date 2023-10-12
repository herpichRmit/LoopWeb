const db = require("../database");
const { Sequelize, DataTypes } = require("sequelize");

// Select all sessions from the database.
exports.all = async (req, res) => {
  const sessions = await db.session.findAll();

  res.json(sessions);
};

// Select one session from the database.
exports.one = async (req, res) => {
  const id = req.params.id;

  const session = await db.session.findByPk(id);

  res.json(session);
};

// Create a session in the database.
exports.create = async (req, res) => {
  const session = await db.session.create({
    first_name: req.body.firstName,
    last_name: req.body.lastName
  });

  return res.json(session);
};

// Update a session in the database.
exports.update = async (req, res) => {
  const id = req.params.id;

  const session = await db.session.findByPk(id);

  session.cinema_name = req.body.cinema_name;
  session.session_time = req.body.session_time;
  session.session_capacity = req.body.session_capacity;

  await session.save();

  return res.json(session);
};

// Remove a session from the database.
exports.remove = async (req, res) => {
  const id = req.params.id;

  let removed = false;

  const session = await db.session.findByPk(id);
  if(session !== null) {
    await session.destroy();
    removed = true;
  }

  return res.json(removed);
};


// Select all cinema locations.
exports.getAllCinemas = async (req, res) => {

  const cinemas = await db.session.findAll({ attributes: [Sequelize.fn('DISTINCT', Sequelize.col("cinema_name")), "cinema_name" ] });

  return res.json(cinemas);
};