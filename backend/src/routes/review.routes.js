module.exports = (express, app) => {
  const controller = require("../controllers/review.controller.js");
  const router = express.Router();

  // Select all users.
  router.get("/", controller.all);

  // Select a single user with id.
  router.get("/select/:id", controller.one);

  // Create a new user.
  router.post("/", controller.create);

  // Update a user with id.
  router.put("/:id", controller.update);

  // Delete a user with id.
  router.delete("/:id", controller.remove);

  // Add routes to server.
  app.use("/api/reviews", router);
};
