const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();

app.set("view engine", "ejs"); //points to default view folder in project folder

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const workItems = [];
const Items = ["Something", "Anything", "Nothing"];
app.get("/", function(req, res) {
    const day = date.getDate();
    res.render("list", {
        listTitle: day,
        ListItems: Items
    });
});

app.post("/", function(req, res){
    const Item = req.body.newItem;
    if(req.body.listVal === "Work List"){
        workItems.push(Item);
        res.redirect("/work");
    } else {
        Items.push(Item);
        res.redirect("/");
    }
});

app.get("/work", function(req, res){
    res.render("list", {
        listTitle: "Work List",
        ListItems: workItems
    });
});

app.get("/about", function(req, res){
    res.render("about");
});

app.listen(3000, function() {
    console.log("Server Running at port 3000.");
});