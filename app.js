//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.set("view engine", "ejs");

app.get("/", function(req, res) {

  var today = new Date(); //plain JS

  //options object to display the day in a specific format
  var options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  };

  //get local date and format it with the option object
  var day = today.toLocaleDateString("en-US", options);


  //do all the computing and logic first and
  //then only pass over the result of that logic
  res.render("list", {
    kindOfDay: day
  });
});

app.listen(3000, function() {
  console.log("Server started on port 3000.");
});
