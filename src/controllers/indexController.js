const offerCalc = require("../functions/offerCalcule")
const db = require("../database/models")

const controllers = {
    index: async (req, res) => {
        const productsList = await db.ProductDetail.findAll({
            include: [{ association: "product", include: ["category"] }, "images"],
            group: "product_id"
        })
        res.render("index", {
            productsList,
            offerCalc
        })
    }
}

module.exports = controllers
