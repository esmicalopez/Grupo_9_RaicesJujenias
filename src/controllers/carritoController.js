const path = require("path")
const productsCart = require("../data/productsCart.json")
const productsList = require("../data/products.json")

const offerCalc = require("../functions/offerCalcule")

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

    if (!req.session.user) {
      return res.redirect("login")
    } 

    res.render('carrito', {
      productsCart,
      productsList,
      totalPrice,
      offerCalc
    });
  },

  buyProducts: (req, res) => {
    if (!req.session.user) { // Unauthorized
      return res.sendStatus(401)
    } 

    if (req.session.user && req.session.user.rol !== "admin") { // Forbidden
      return res.sendStatus(403)
    } 

    const endpoint = req.originalUrl;

    res.send("comprar productos")
  }


}

module.exports = controllers