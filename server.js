const config = require("./app/config/environment.config.js");
const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");
const app = express();

var corsOptions = {
  credentials: true,
  origin: ["http://localhost:3000"],
};
app.use(cors(corsOptions));

// parse requests of content-type - application/json
// app.use(express.static("public"));
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(
  cookieSession({
    name: "circle-market-session",
    secret: "COOKIE_SECRET", // should use as secret environment variable
    httpOnly: true,
  })
);
console.log(
  `NODE_ENV=${config.NODE_ENV} ${process.env.NODE_ENV} ${process.env.DBPORT}`
);
//CONNECTING TO MONGODB
const db = require("./app/models");

if (process.env.NODE_ENV === "production") {
  db.mongoose
    .connect(
      `mongodb+srv://${process.env.DBHOST}:${process.env.DBPORT}/${process.env.DBNAME}`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    .then(() => {
      console.log("Successfully connect to MongoDB.");
    })
    .catch((err) => {
      console.error("Connection error", err);
      process.exit();
    });
} else {
  db.mongoose
    .connect(
      `mongodb://${process.env.DBHOST}:${process.env.DBPORT}/${process.env.DBNAME}`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    .then(() => {
      console.log("Successfully connect to MongoDB.");
    })
    .catch((err) => {
      console.error("Connection error", err);
      process.exit();
    });
}

app.get("/", (req, res) => {
  res.json({ message: "Hello there. Welcome to circle market api" });
});

//ROUTES
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);

const port = config.PORT || 8000;
app.listen(port, () => console.log("Listening on", port));
