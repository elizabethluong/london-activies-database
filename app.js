const express = require("express");
const bodyParser = require("body-parser");
const knex = require("./db/knex.js");
const app = express();

// Parse requests into json format.
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
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

app.get("/api/v1/reviews", (req, res) => {
  // res.send("hello");
  knex("reviews")
    .select("*")
    .from("reviews")
    .then(result => {
      res.json(result);
    });
});

app.get("/api/v1/activities_and_reviews", (req, res) => {
  // res.send("hello");
  knex("reviews")
    // .groupBy("activities_info.activity")
    .join("activities_info", "activities_info.id", "=", "reviews.activity_id")
    .select("activities_info.activity", "reviews.review")
    .then(result => {
      res.json(result);
    });
});

app.get("/api/v1/activity/:id", (req, res) => {
  const id = parseInt(req.params.id);
  knex("activities_info")
    .select("*")
    .from("activities_info")
    .where({ id: id })
    .first()
    .then(result => {
      res.json(result);
    });
});

app.post("/api/v1/add_activity", (req, res) => {
  console.log(req.body);
  knex("activities_info")
    .insert({
      activity: req.body.activity.length > 0 ? req.body.activity : null,
      area: req.body.area.length > 0 ? req.body.area : null,
      price: req.body.price.length > 0 ? req.body.price : null,
      type_of_activity:
        req.body.type_of_activity.length > 0 ? req.body.type_of_activity : null
    })
    .then(promise => {
      res.json(promise);
    })
    .catch(error => {
      console.log(error);
    });
  // res.redirect("/");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000!");
});

module.exports = app;
