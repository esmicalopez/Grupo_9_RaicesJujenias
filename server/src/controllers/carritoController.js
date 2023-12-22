const productsCart = require("../data/productsCart.json")
const productsList = require("../data/products.json")
const productModel = require("../models/products.js")

const offerCalc = require("../functions/offerCalcule")

function totalPrice (productsPrices) {
    let precioTotal = 0
    for (const p of productsPrices) {
        if (p.offer !== 0) {
            precioTotal += offerCalc(p.price, p.offer)
        } else {
            precioTotal += p.price
        }
    }
    return precioTotal
}

const controllers = {
    carrito: async (req, res) => {
        if (!req.session.user) {
            return res.redirect("login")
        }

        const { productsList } = await productModel.carrito()

        res.render("carrito", {
            productsList,
            offerCalc
        })
    },

    buyProducts: (req, res) => {
        if (!req.session.user) { // Unauthorized
            return res.sendStatus(401)
        }

        if (req.session.user && req.session.user.rol !== "admin") { // Forbidden
            return res.sendStatus(403)
        }
        // const endpoint = req.originalUrl

        res.send("comprar productos")
    }

}

module.exports = controllers
