const path = require("path")
const productsCart = require("../data/productsCart.json")
const products = require("../data/products.json")

const controllers = {
  carrito: (req, res) => {
    res.render('carrito', {
      productsCart,
      products
    });
  },

}

module.exports = controllers