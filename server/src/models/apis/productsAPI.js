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
    },

    detalleProducto: async ({ id }) => {
        const product = await db.Product.findByPk(id, {
            attributes: ["id", "name", "description"],
            include: ["category"]
        })

        const detail = await db.ProductDetail.findAll({
            where: { product_id: id },
            include: ["color", "size", "images"]
        })

        const productDetail = []
        for (const product of detail) {
            const images = []
            for (const image of product.images) {
                images.push({
                    id: image.id,
                    name: image.name,
                    url: `/images/products/${image.name}`
                })
            }
            productDetail.push({
                id: product.id,
                price: product.price,
                offer: product.offer,
                stock: product.stock,
                color: product.color,
                size: product.size,
                images
            })
        }

        return {
            product,
            productDetail
        }
    }

}

module.exports = productModel
