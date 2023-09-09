const path = require("path")
const productsCart = require("../data/productsCart.json")
const productsList = require("../data/products.json")

let offerCalc = require("../functions/offerCalcule")

function totalPrice(productsPrices) {
  let precioTotal = 0;
  for(p of productsPrices) {
    if (p.offer !== 0) {
      precioTotal += offerCalc(p.price, p.offer)
    } else{
      precioTotal += p.price
    }
    
  }
  return precioTotal
}


const controllers = {
  carrito: (req, res) => {

    res.render('carrito', {
      productsCart,
      productsList,
      totalPrice,
      offerCalc
    });
  },

}

module.exports = controllers