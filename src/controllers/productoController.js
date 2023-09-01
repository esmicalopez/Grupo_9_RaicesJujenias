const products = require("../data/products.json")

const controllers = {
  productos: (req, res) => {
    res.render('productos', {
      products
    });
  },
  detallesProducto: (req, res) => {
    res.render('detallesProducto');
  },
}

module.exports = controllers
