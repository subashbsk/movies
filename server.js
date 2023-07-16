const express = require("express");
const cors = require("cors");
var validateUser = require("./app/middleware/validateUser")
const app = express();
const path = require('path');
const bodyParser = require("body-parser");
var corsOptions = {
  origin: "http://localhost:8080"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
app.set('secretKey', 'nodeRestApi');
const db = require("./app/models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });
  app.use(express.static("public"));
  app.use(bodyParser.urlencoded({ extended: true }))

// simple route
// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname + '/public/index.html'));
// });

require("./app/routes/movie.routes")(app);
require("./app/routes/user.routes")(app);
// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
