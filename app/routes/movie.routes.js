var jwt = require('jsonwebtoken');
module.exports = app => {
 
  const movies = require("../controllers/movie.controller.js");
  
  var router = require("express").Router();

  // Create a new movies
  router.post("/", movies.create);

  // Retrieve all movies
  router.get("/", movies.findAll);

  // Retrieve all published movies
  router.get("/published", movies.findAllPublished);

  // Retrieve a single Movie with id
  router.get("/:id", movies.findOne);

  // Update a Movie with id
  router.put("/:id", movies.update);

  // Delete a Movie with id
  router.delete("/:id", movies.delete);

  // Create a new Movie
  router.delete("/", movies.deleteAll);

  app.use("/api/movies",validateUser, router);
};
function validateUser(req, res, next) {
  jwt.verify(req.headers['x-access-token'], req.app.get('secretKey'), function(err, decoded) {
    if (err) {
      res.json({status:"error", message: err.message, data:null});
    }else{
      // add user id to request
      req.body.userId = decoded.id;
      next();
    }
  });
  
}