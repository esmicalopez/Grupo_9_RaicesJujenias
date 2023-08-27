const path = require("path")

let controllers = {
    carrito: (req, res) => {
        res.sendFile(path.join(__dirname, '../views', 'carrito.html'));
      }
}

module.exports = controllers