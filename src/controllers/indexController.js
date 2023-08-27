const path = require("path")

let controllers = {
    index: (req, res) => {
        res.sendFile(path.join(__dirname, '../views', 'index.html'));
      },
    register: (req, res) => {
        res.sendFile(path.join(__dirname, '../views', 'registro.html'));
      },
    login: (req, res) => {
        res.sendFile(path.join(__dirname, "../views", "login.html"))
      }
}

module.exports = controllers