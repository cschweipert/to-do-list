//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

let items = ["Ride Bike", "Program", "Make Dinner"];

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));

//serve up static files
app.use(express.static("public"));

app.get("/", function(req, res) {

  let today = new Date(); //plain JS

  //options object to display the day in a specific format
  let options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  };

  //get local date and format it with the option object
  let day = today.toLocaleDateString("en-US", options);

  //do all the computing and logic first and
  //then only pass over the result of that logic
  res.render("list", {
    kindOfDay: day,
    newListItems: items
  });
});

app.post("/", function(req, res) {

  let item = req.body.newItem;

  items.push(item);

  res.redirect("/");

});

app.listen(3000, function() {
  console.log("Server started on port 3000.");
});
