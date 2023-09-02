const productsList = require("../data/products.json")

const controllers = {
  productos: (req, res) => {
    res.render('productos', {
      productsList
    });
  },
  detallesProducto: (req, res) => {
    const id = req.params.id
    const producto = products.find( product => product.id == id)
    
    if (product) {
      res.render('detallesProducto', {
      producto
    });
    } else{
      res.send('Producto no encontrado')
    }
  },

}

module.exports = controllers
