const path = require("path")

let controllers = {
    carrito: (req, res) => {
        res.render('carrito');
      }
}

module.exports = controllers