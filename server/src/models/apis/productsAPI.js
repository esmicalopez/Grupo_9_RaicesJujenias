const db = require("../../database/models")
// const Op = db.Sequelize.Op

const productModel = {
    productos: async () => {
        const productsListRaw = await db.Product.findAll({
            attributes: ["id", "name", "description"],
            include: ["category"]
        })

        const categoriesRaw = await db.Category.findAll({
            include: ["products"],
            order: [
                ["id"]
            ]
        })

        const categoryList = []
        for (const category of categoriesRaw) {
            categoryList.push({
                name: category.name,
                totalProducts: category.products.length
            })
        }

        const productList = []
        for (const product of productsListRaw) {
            productList.push({
                product,
                detail: `/api/products/${product.id}`
            })
        }

        return {
            productList,
            categoryList
        }
    }

    // detalleProducto: async ({ id, prodSpecId }) => {
    //     const product = await db.Product.findByPk(id)

    //     if (!product) return false

    //     const detail = await db.ProductDetail.findAll({
    //         where: { product_id: id },
    //         include: ["color", "size"]
    //     })

    //     const chosenProductSpec = await db.ProductDetail.findByPk(prodSpecId, {
    //         include: ["images", "color", "size"]
    //     })

    //     const newProductsList = await db.Product.findAll({
    //         include: [{
    //             association: "product_detail",
    //             include: ["images"],
    //             where: { product_id: { [Op.ne]: id } }
    //         }, "category"],
    //         group: "product_id"
    //     })

    //     return {
    //         product,
    //         detail,
    //         chosenProductSpec,
    //         newProductsList
    //     }
    // }

}

module.exports = productModel
