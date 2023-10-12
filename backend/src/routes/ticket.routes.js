module.exports = (express, app) => {
  const controller = require("../controllers/ticket.controller.js");
  const router = express.Router();

  // Select all tickets.
  router.get("/", controller.all);

  // Select a single ticket with id.
  router.get("/select/:id", controller.one);

  // Create a new ticket.
  router.post("/", controller.create);

  // Update a ticket with id.
  router.put("/:id", controller.update);

  // Delete a ticket with id.
  router.delete("/:id", controller.remove);

  // Add routes to server.
  app.use("/api/tickets", router);
};
