const products = require("../data/products.json")


const controllers = {
    index: (req, res) => {
        res.render('index', {
          products
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