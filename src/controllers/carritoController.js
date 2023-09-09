const path = require("path")
const productsCart = require("../data/productsCart.json")
const productsList = require("../data/products.json")

const controllers = {
  carrito: (req, res) => {
    let precioTotal = 0;
    
    for(p of productsCart) {
      precioTotal += p.price
    }
    
    res.render('carrito', {
      productsCart,
      productsList,
      precioTotal
    });
  },

}

module.exports = controllers