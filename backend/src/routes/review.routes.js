module.exports = (express, app) => {
  const controller = require("../controllers/review.controller.js");
  const router = express.Router();

  // Select all reviews.
  router.get("/", controller.all);

  // Select a single review with id.
  router.get("/select/:id", controller.one);

  // Create a new review.
  router.post("/", controller.create);

  // Update a review with id.
  router.put("/:id", controller.update);

  // Delete a review with id.
  router.delete("/:id", controller.remove);

  // Add routes to server.
  app.use("/api/reviews", router);
};
