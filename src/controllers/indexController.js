const productsList = require("../data/products.json")

let offerCalc = require("../functions/offerCalcule")

const controllers = {
    index: (req, res) => {
        res.render('index', {
          productsList,
          offerCalc
        });
      },
    register: (req, res) => {
        res.render('registro');
      },
    login: (req, res) => {
        res.render("login")
      }
}

module.exports = controllers