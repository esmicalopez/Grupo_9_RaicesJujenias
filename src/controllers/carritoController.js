const path = require("path")
const products = require("../data/productsCart.json")

const controllers = {
  carrito: (req, res) => {
    res.render('carrito', {
      products
    });
  },

}

module.exports = controllers