const config = require("./app/config/environment.config.js");
const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");
const app = express();

// var corsOptions = {
//   credentials: true,
//   origin: [
//     "http://localhost:3000",
//     "http://localhost:8080",
//     "http://localhost:8000",
//     "https://www.circlemarket.ca",
//     "https://api.circlemarket.ca",
//   ],
// };
// app.use(cors(corsOptions));

app.use(cors({ origin: true }));

// parse requests of content-type - application/json
app.use(express.static("public"));
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
console.log(`NODE_ENV=${config.NODE_ENV}`);
//CONNECTING TO MONGODB
const db = require("./app/models");

const connectionString =
  process.env.NODE_ENV === "production" || process.env.NODE_ENV === "staging"
    ? `mongodb+srv://${process.env.REACT_APP_DB_USER}:${process.env.REACT_APP_DB_PW}@${process.env.REACT_APP_DB_SERVER}/${process.env.REACT_APP_DB_NAME}?retryWrites=true&w=majority`
    : `mongodb://${process.env.REACT_APP_DB_HOST}:${process.env.REACT_APP_DB_PORT}/${process.env.REACT_APP_DB_NAME}`;

// const connectionString = `mongodb://${process.env.REACT_APP_DB_USER}:${process.env.REACT_APP_DB_PW}@${REACT_APP_DB_SERVER}/${process.env.REACT_APP_DB_NAME}?retryWrites=true&w=majority`;

db.mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`Successfully connected to MongoDB - ${process.env.NODE_ENV}`);
  })
  .catch((err) => {
    console.error("Connection error", err);
    process.exit();
  });

app.get("/", (req, res) => {
  res.json({ message: "Hello there. Welcome to circle market api" });
});

//ROUTES
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/post.routes")(app);

const port = config.PORT || 8000;
app.listen(port, () => console.log("Listening on", port));
