const path = require("path")
const productsCart = require("../data/productsCart.json")

const controllers = {
  carrito: (req, res) => {
    res.render('carrito', {
      productsCart
    });
  },

}

module.exports = controllers