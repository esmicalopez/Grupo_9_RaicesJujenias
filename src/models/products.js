const db = require("../database/models")
const Op = db.Sequelize.Op

const productModel = {
    productos: async () => {
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

        return {
            productsList,
            categories
        }
    },

    detallesProducto: async ({ id, prodSpecId }) => {
        const product = await db.Product.findByPk(id)

        if (!product) return false

        const detail = await db.ProductDetail.findAll({
            where: { product_id: id },
            include: ["color", "size"]
        })

        const chosenProductSpec = await db.ProductDetail.findByPk(prodSpecId, {
            include: ["images", "color", "size"]
        })

        const newProductsList = await db.Product.findAll({
            include: [{
                association: "product_detail",
                include: ["images"],
                where: { product_id: { [Op.ne]: id } }
            }, "category"],
            group: "product_id"
        })

        return {
            product,
            detail,
            chosenProductSpec,
            newProductsList
        }
    },

    crearProductoView: async () => {
        const colors = await db.Color.findAll()
        const sizes = await db.Size.findAll()
        const categories = await db.Category.findAll()

        return { colors, sizes, categories }
    },

    crearProducto: async ({ data, files }) => {
        const { price, stock, name, description, category, size, color } = data

        const product = await db.ProductDetail.create({
            price,
            stock,
            product: {
                name,
                description,
                category_id: category
            },
            size_id: size,
            color_id: color
        }, {
            include: [{ association: "product", include: ["category"] }]
        })

        for (const image of files) {
            db.Image.create({
                name: image.originalname, // => cambiar a "name: image.filename". Lo Cambie para que se vea el nombre original.
                product_detail_id: product.id
            })
        }

        return product
    },

    editarProductoView: async ({ id, prodSpecId }) => {
        const product = await db.Product.findByPk(id, { include: ["category"] })

        if (!product) return false

        const colors = await db.Color.findAll()
        const sizes = await db.Size.findAll()
        const categories = await db.Category.findAll()

        const detail = await db.ProductDetail.findAll({
            where: { product_id: id },
            include: ["images", "color", "size"]
        })
        const chosenProductSpec = await db.ProductDetail.findByPk(prodSpecId, {
            include: ["images", "color", "size"]
        })

        const newProductsList = await db.ProductDetail.findAll({
            where: {
                id: {
                    [Op.ne]: prodSpecId
                },
                product_id: id
            },
            include: ["images", "color", "size"]
        })

        return {
            product,
            colors,
            sizes,
            categories,
            detail,
            chosenProductSpec,
            newProductsList
        }
    },

    editarProducto: async ({ params, data, files }) => {
        const { id, productSpec } = params
        const { name, price, offer, stock, color, size, category, description } = data

        const offerValue = offer !== "0" ? offer : null

        const updateProduct = await db.Product.update({
            name,
            description,
            category_id: category
        }, {
            where: { id }
        })

        const updateProductDetail = await db.ProductDetail.update({
            price,
            offer: offerValue,
            stock,
            color_id: color,
            size_id: size
        }, {
            where: { id: productSpec }
        })

        if (!files.length > 0) {
            return {
                updateProduct,
                updateProductDetail
            }
        }

        for (const image of files) {
            await db.Image.update({
                name: image.filename
            }, {
                where: { product_detail_id: productSpec } // le saque el => id  ||  hablar de esto
            })
        }

        return {
            updateProduct,
            updateProductDetail
        }
    },

    eliminarProducto: async ({ id, productSpec }) => {
        const deleteProduct = await db.Product.destroy({
            where: {
                id
            }
        })

        // Hablar de esto
        // const deleteProductDetail = db.ProductDetail.destroy({
        //     where: {
        //         product_id: productSpec
        //     }
        // })

        return deleteProduct
    }

}

module.exports = productModel
