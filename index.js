require("dotenv").config();
const fs = require("fs");
const express = require("express");
const app = express();

const { v4: uuid } = require("uuid");
const { PORT } = process.env || 8080;
const cors = require("cors");
const userRoutes = require("./routes/user");

app.use(cors());
app.use(express.static("public"));
app.use(express.json());

app.use("/users", userRoutes);

app.get("/", (req, res) => {
  res.send("Hello there!!!");
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

//CONNECTING TO MONGODB
const db = require("./models");

db.mongoose
  .connect(`mongodb://localhost:27017/circle-market-local`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    // initial();
  })
  .catch((err) => {
    console.log("Connection error", err);
    process.exit();
  });
