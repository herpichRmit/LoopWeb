const db = require("../database");

// Select all tickets from the database.
exports.all = async (req, res) => {
  const tickets = await db.ticket.findAll();

  res.json(tickets);
};

// Select one ticket from the database.
exports.one = async (req, res) => {
  const id = req.params.id;

  const ticket = await db.ticket.findByPk(id);

  res.json(ticket);
};

// Create a ticket in the database.
exports.create = async (req, res) => {
  const ticket = await db.ticket.create({
    first_name: req.body.firstName,
    last_name: req.body.lastName
  });

  return res.json(ticket);
};

// Update a ticket in the database.
exports.update = async (req, res) => {
  const id = req.params.id;

  const ticket = await db.ticket.findByPk(id);

  ticket.first_name = req.body.firstName;
  ticket.last_name = req.body.lastName;

  await ticket.save();

  return res.json(ticket);
};

// Remove a ticket from the database.
exports.remove = async (req, res) => {
  const id = req.params.id;

  let removed = false;

  const ticket = await db.ticket.findByPk(id);
  if(ticket !== null) {
    await ticket.destroy();
    removed = true;
  }

  return res.json(removed);
};


// Remove a ticket from the database.
exports.login = async (req, res) => {
  const id = req.params.id;

  let removed = false;

  const ticket = await db.ticket.findByPk(id);
  if(ticket !== null) {
    
  }

  return res.json(removed);
};