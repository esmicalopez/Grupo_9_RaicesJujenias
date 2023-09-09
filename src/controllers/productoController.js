const fs = require("fs")
const path = require("path")

let productsList = require("../data/products.json")

const controllers = {
  productos: (req, res) => {
    res.render('productos', {
      productsList
    });
  },

  detallesProducto: (req, res) => {
    const id = req.params.id
    const product = productsList.find( product => product.id == id)
    let newProductsList = productsList.filter((p)=> p.id !== product.id)

    if (product) {
      res.render('detallesProducto', {
        product, newProductsList
      });
    } else{
      res.send('Producto no encontrado')
    }
  },

  crearProductoView: (req, res) => {
    res.render('createProduct')
  },

  crearProducto: (req, res) => {
    let lastProduct = productsList.pop()
    
    let newProduct = {
      id: lastProduct.id + 1,
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      category: req.body.category,
      image: req.body.image || "incognita.png",
      author: req.body.author,
      sizes: [req.body.size],
      colors: req.body.colors.split(",") || "",
      stock: req.body.stock
    }

    productsList.push(lastProduct, newProduct)

    fs.writeFileSync(path.join(__dirname, "../data/products.json"), JSON.stringify(productsList))

    res.redirect("/productos")
  },

  editarProductoView: (req, res) => {
    let product = productsList.find((p) => p.id === +req.params.id)
    res.render('editProduct', {product})
  },

  editarProducto: (req, res) => {
    let productsUpdated = []
    productsList.forEach(function (p) {
      if (p.id === +req.params.id) {
        p.name = req.body.name
        p.price = +req.body.price
        p.description = req.body.description 
        p.offer = +req.body.offer 
        p.category = req.body.category 
        p.image = req.body.image || "incognita.png"
        p.author = req.body.author 
        p.sizes = [req.body.size] 
        p.colors = req.body.colors.split(",") || ""
        p.stock = req.body.stock
      }
      productsUpdated.push(p)
    })
    
    fs.writeFileSync(path.join(__dirname, "../data/products.json"), JSON.stringify(productsUpdated))

    res.redirect(`/productos/${+req.params.id}`)
  },

  eliminarProducto: (req, res) => {
    productsList = productsList.filter((p) => p.id !== +req.params.id)

    fs.writeFileSync(path.join(__dirname, "../data/products.json"), JSON.stringify(productsList))

    res.redirect("/productos")
  }

}

module.exports = controllers
