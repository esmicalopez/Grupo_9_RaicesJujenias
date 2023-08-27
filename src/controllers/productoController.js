const path = require("path")

let controllers = {
    producto: (req, res) => {
        res.sendFile(path.join(__dirname, '../views', 'producto.html'));
      }
}

module.exports = controllers
