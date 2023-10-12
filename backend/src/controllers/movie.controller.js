const db = require("../database");

// Select all movies from the database.
exports.all = async (req, res) => {
  const movies = await db.movie.findAll();

  res.json(movies);
};

// Select one movie from the database.
exports.one = async (req, res) => {
  const id = req.params.id;

  const movie = await db.movie.findByPk(id, { include: { all: true, nested: true } });

  res.json(movie);
};

// Create a movie in the database.
exports.create = async (req, res) => {
  const movie = await db.movie.create({
    first_name: req.body.firstName,
    last_name: req.body.lastName
  });

  return res.json(movie);
};

// Update a movie in the database.
exports.update = async (req, res) => {
  const id = req.params.id;

  const movie = await db.movie.findByPk(id);

  movie.first_name = req.body.firstName;
  movie.last_name = req.body.lastName;

  await movie.save();

  return res.json(movie);
};

// Remove a movie from the database.
exports.remove = async (req, res) => {
  const id = req.params.id;

  let removed = false;

  const movie = await db.movie.findByPk(id);
  if(movie !== null) {
    await movie.destroy();
    removed = true;
  }

  return res.json(removed);
};


// Remove a movie from the database.
exports.login = async (req, res) => {
  const id = req.params.id;

  let removed = false;

  const movie = await db.movie.findByPk(id);
  if(movie !== null) {
    
  }

  return res.json(removed);
};