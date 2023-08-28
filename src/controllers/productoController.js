const path = require("path")

let controllers = {
    producto: (req, res) => {
        res.render('producto');
      }
}

module.exports = controllers
