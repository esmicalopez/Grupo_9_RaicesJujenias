const path = require("path")
const productsCart = require("../data/productsCart.json")
const productsList = require("../data/products.json")

const controllers = {
  carrito: (req, res) => {
    res.render('carrito', {
      productsCart,
      productsList
    });
  },

}

module.exports = controllers