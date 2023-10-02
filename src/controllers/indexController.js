const productsList = require("../data/products.json")
const usersList = require("../data/users.json")

let offerCalc = require("../functions/offerCalcule")

const controllers = {
    index: (req, res) => {
      let userSession = req.session.user ? req.session.user : "";
        res.render('index', {
          productsList,
          offerCalc,
          userSession,
        });
      },
    register: (req, res) => {
        res.render('registro');
      },
    login: (req, res) => {
        res.render("login")
      },
    loginPost: (req, res) => {
        let user = usersList.find((u) => u.email === req.body.email && u.password === req.body.userPassword)
        if(!user){
          res.redirect("/login")
        } else{
          req.session.user = user
          res.redirect("/")
        }
    }
}

module.exports = controllers