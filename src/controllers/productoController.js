const productsList = require("../data/products.json")

const controllers = {
  productos: (req, res) => {
    res.render('productos', {
      productsList
    });
  },
  detallesProducto: (req, res) => {
    let product = productsList.find((p) => p.id === +req.params.id)
    if (product) {
      res.render('detallesProducto', {product});
    } else{
      res.send('Producto no encontrado')
    }
  },
}

module.exports = controllers
