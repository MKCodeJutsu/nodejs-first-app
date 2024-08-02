const express = require("express");
const router = express.Router();
const Customer = require("../models/customerSchema");
var moment = require("moment");

// Pages Rendering Get Request

router.get("/", (req, res) => {
  console.log("--------------------------------");
  Customer.find()
    .then((result) => {
      res.render("index", { customers: result, moment: moment });
    })
    .catch((err) => {
      console.log(err);
    });
});
router.get("/edit/:id", (req, res, result) => {
  Customer.findById(req.params.id)
    .then((result) => {
      res.render("user/edit", { sel: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/user/search.html", (req, res) => {
  res.render("user/search");
});

router.get("/view/:id", (req, res) => {
  Customer.findById(req.params.id)
    .then((result) => {
      res.render("user/view", { obj: result, moment: moment });
    })
    .catch((err) => {
      console.log(err);
    });
});

//POST Request

router.post("/search", (req, res) => {
  const searchText = req.body.searchText.trim();
  Customer.find({ $or: [{ firstName: searchText }, { lastName: searchText }] })
    .then((result) => {
      console.log(result);
      res.render("user/search", { put: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

// Delete Request


router.delete("/edit/:id", (req, res) => {
  Customer.findByIdAndDelete(req.params.id)
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
});

// Update Request


router.put("/edit/:id", (req, res) => {
  Customer.updateOne({ _id: req.params.id }, req.body)
    .then((result) => {
      console.log(result);
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
