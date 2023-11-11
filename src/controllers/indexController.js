const offerCalc = require("../functions/offerCalcule")
const db = require("../database/models")

const controllers = {
    index: async (req, res) => {
        const productsList = await db.Product.findAll({
            include: [{ association: "product_detail", include: ["images", "size", "color"] }, "category"],
            group: "product_id"
        })
        const categories = await db.Category.findAll({
            include: ["products"],
            order: [
                ["id"]
            ]
        })
        res.render("index", {
            productsList,
            categories,
            offerCalc
        })
    }
}

module.exports = controllers
