const express = require("express");
const router = express.Router();
const Customer = require("../models/customerSchema");
var moment = require("moment");


// Pages Rendering Get Request

router.get("", (req, res) => {
  res.render("user/add");
} );

//POST Request

router.post("", (req, res) => {
  Customer.create(req.body)
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
} );

module.exports = router;
