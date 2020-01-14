const express = require("express");
const bodyParser = require("body-parser");
const knex = require("./db/knex.js");
const app = express();

// Parse requests into json format.
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Insert homepage message here" });
});

app.get("/api/v1/activities_info", (req, res) => {
  // res.send("hello");
  knex("activities_info")
    .select("*")
    .from("activities_info")
    .then(result => {
      res.json(result);
    });
});
// Test route for adding data
app.get("/test", (req, res) => {
  knex("reviews").insert({ review: "Horrible!", activity_id: "1" });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000!");
});
