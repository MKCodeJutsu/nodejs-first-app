const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
const Customer = require("./models/customerSchema");
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));
var moment = require("moment");
var methodOverride = require("method-override");
app.use(methodOverride("_method"));

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
  console.log("--------------------------------");
  Customer.find()
    .then((result) => {
      res.render("index", { customers: result, moment: moment });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/user/add.html", (req, res) => {
  res.render("user/add");
});

app.get("/edit/:id", (req, res, result) => {
  Customer.findById(req.params.id)
    .then((result) => {
      res.render("user/edit", { sel: result});
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/user/search.html", (req, res) => {
  res.render("user/search");
});

app.get("/view/:id", (req, res) => {
  Customer.findById(req.params.id)
    .then((result) => {
      res.render("user/view", { obj: result, moment: moment });
    })
    .catch((err) => {
      console.log(err);
    });
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

// Delete Request

app.delete("/edit/:id", (req, res) => {
  Customer.findByIdAndDelete(req.params.id)
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
});

// Update Request

app.put("/edit/:id", (req, res) => {
  Customer.findByIdAndUpdate(req.params.id)
    .then(() => {
      res.redirect("/");
  }).catch((err) => { 
     console.log(err);
   })
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
