const productsList = require("../data/products.json")
const offerCalc = require("../functions/offerCalcule")

const controllers = {
    index: (req, res) => {
      console.log(req.session)
      console.log("locals")
      console.log(res.locals)
        res.render('index', {
          productsList,
          offerCalc
        })
      }
}

module.exports = controllers