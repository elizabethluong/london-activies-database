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

app.get("/api/v1/activity/id/:id", (req, res) => {
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

app.get("/api/v1/activity/type_of_activity/:type_of_activity", (req, res) => {
  const type_of_activity = req.params.type_of_activity;
  knex("activities_info")
    .select("*")
    .from("activities_info")
    .where({ type_of_activity: type_of_activity })
    .then(result => {
      res.json(result);
    });
});

app.post("/api/v1/add_activity", (req, res) => {
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

app.get("/api/v1/update_activity", (req, res) => {
  res.sendFile(__dirname + "/views/edit_activity.html");
});

app.post("/api/v1/activity_updated", (req, res) => {
  let valuesToUpdate = {};
  for (key of Object.keys(req.body)) {
    if (key === "id") {
      continue;
    } else if (req.body[key] === "") {
      continue;
    } else {
      valuesToUpdate[key] = req.body[key];
    }
  }
  console.log(valuesToUpdate);
  knex("activities_info")
    .where("id", "=", parseInt(req.body.id))
    .update(valuesToUpdate)
    .then(promise => {
      res.json(promise);
    })
    .catch(error => {
      console.log(error);
    });
  res.redirect("/api/v1/activity/id/" + req.body.id);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000!");
});

module.exports = app;
