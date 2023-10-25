const productsList = require("../data/products.json")
const offerCalc = require("../functions/offerCalcule")

const controllers = {
    index: (req, res) => {
        res.render("index", {
            productsList,
            offerCalc
        })
    }
}

module.exports = controllers
