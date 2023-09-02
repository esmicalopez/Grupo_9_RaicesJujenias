const productsList = require("../data/products.json")


const controllers = {
    index: (req, res) => {
        res.render('index', {
          productsList
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