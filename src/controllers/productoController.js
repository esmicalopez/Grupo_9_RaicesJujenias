const products = require("../data/products.json")

const controllers = {
  productos: (req, res) => {
    res.render('productos', {
      products
    });
  },
  detallesProducto: (req, res) => {
    const id = req.params.id
    const producto = products.find( product => product.id == id)
    
    res.render('detallesProducto', {
      producto
    });
  },

}

module.exports = controllers
