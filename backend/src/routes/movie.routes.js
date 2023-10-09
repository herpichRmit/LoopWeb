module.exports = (express, app) => {
    const controller = require("../controllers/movie.controller.js");
    const router = express.Router();
  
    // Select all movies.
    router.get("/", controller.all);
  
    // Select a single movie with id.
    router.get("/select/:id", controller.one);
  
    // Create a new movie.
    router.post("/", controller.create);
  
    // Update a movie with id.
    router.put("/:id", controller.update);
  
    // Delete a movie with id.
    router.delete("/:id", controller.remove);
  
    // Add routes to server.
    app.use("/api/movies", router);
  };
  