const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
const Customer = require("./models/customerSchema");
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));

//Auto Refresh
const path = require("path");
const livereload = require("livereload");
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, "public"));

const connectLivereload = require("connect-livereload");
app.use(connectLivereload());

liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});

// Pages Rendering Get Request

app.get("/", (req, res) => {
  Customer.find()
    .then((result) => {
      res.render("index", { customers: result });
    })
    .catch((err) => {
      console.log(err);
    });
  
});

app.get("/user/add.html", (req, res) => {
  res.render("user/add");
});

app.get("/user/edit.html", (req, res) => {
  res.render("user/edit");
});

app.get("/user/search.html", (req, res) => {
  res.render("user/search");
});

app.get("/user/view.html", (req, res) => {
  res.render("user/view");
});

//POST Request

app.post("/user/add.html", (req, res) => {
  const customer = new Customer(req.body);
  customer
    .save()
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
});

// MongoDB Connection Database
mongoose
  .connect(
    "mongodb+srv://muhammedakamel:Ko2HFhyeDbAhSpnU@cluster0.wydsh5l.mongodb.net/all-data?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    app.listen(port, () => {
      console.log(`http://localhost:${port}/`);
    });
  })
  .catch((error) => {
    console.log(err);
  });
