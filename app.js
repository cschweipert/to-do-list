//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

let items = ["Ride Bike", "Program", "Make Dinner"];

//add a separte data store for work list
let workItems = [];

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({
  extended: true
}));

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
    listTitle: day,
    newListItems: items
  });
});

app.post("/", function(req, res) {

  let item = req.body.newItem;

  //if statement to push items to the right array
  if (req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }

});

//add another route targeting /work
app.get("/work", function(reg, res) {
  res.render("list", {
    listTitle: "Work List",
    newListItems: workItems
  });
});

app.post("/work", function(req, res) {
  let item = req.body.newItem;
  workItem.push(item);
  res.redirect("work");
});

app.listen(3000, function() {
  console.log("Server started on port 3000.");
});
