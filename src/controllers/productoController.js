const productsList = require("../data/products.json")

const controllers = {
  productos: (req, res) => {
    res.render('productos', {
      productsList
    });
  },

  detallesProducto: (req, res) => {
    const id = req.params.id
    const product = productsList.find( product => product.id == id)
    
    if (product) {
      res.render('detallesProducto', {
        product
      });
    } else{
      res.send('Producto no encontrado')
    }
  },

  crearProducto: (req, res) => {
    res.render('createProduct')
  },

}

module.exports = controllers
