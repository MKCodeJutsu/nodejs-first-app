
const Customer = require("../models/customerSchema");
var moment = require("moment");







const user_index_get = (req, res) => {
  console.log("--------------------------------");
  Customer.find()
    .then((result) => {
      res.render("index", { customers: result, moment: moment });
    })
    .catch((err) => {
      console.log(err);
    });
};

const user_add_get = (req, res) => {
  res.render("user/add");
}



const user_add_post = (req, res) => {
  Customer.create(req.body)
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
  }


const user_view_get = (req, res) => {
  Customer.findById(req.params.id)
    .then((result) => {
      res.render("user/view", { obj: result, moment: moment });
    })
    .catch((err) => {
      console.log(err);
    });
};


const user_search_post = (req, res) => {
  const searchText = req.body.searchText.trim();
  Customer.find({ $or: [{ firstName: searchText }, { lastName: searchText }] })
    .then((result) => {
      console.log(result);
      res.render("user/search", { put: result });
    })
    .catch((err) => {
      console.log(err);
    });
};






module.exports = ( user_index_get, user_view_get, user_search_post, user_add_get, user_add_post)