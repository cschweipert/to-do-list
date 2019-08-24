//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({
  extended: true
}));

//serve up static files
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/todolistDB", {
  useNewUrlParser: true
});

const itemsSchema = {
  name: String
};

const Item = mongoose.model("Item", itemsSchema);

const Item1 = new Item({
  name: "Welcome to your todolist!"
});

const Item2 = new Item({
  name: "Hit the + button to add a new item."
});

const Item3 = new Item({
  name: "<-- Hit this to delete an item."
});

const defaultItems = [Item1, Item2, Item3];

app.get("/", function(req, res) {

  Item.find({}, function(err, foundItems) {

    if (foundItems.length === 0) {
      Item.insertMany(defaultItems, function(err) {
        if (err) {
          console.log(err);
        } else {
          console.log("Successfully saved default items to DB.");
        }
      });
      res.redirect("/");  //shortcut to render defaultItems
    } else {
      res.render("list", {
        listTitle: "Today",
        newListItems: foundItems
      });
    }
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
