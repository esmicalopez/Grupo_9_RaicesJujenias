const db = require("../database/models")
const Op = db.Sequelize.Op

const productModel = {
    productos: async ({ page, category }) => {
        const numberPage = page === 0 ? 1 : page
        const productsGroup = 4 * (numberPage - 1)

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

        let alteredProducts
        let totalProducts
        console.log(categories.length)
        if (category < 7 && category > 0) {
            alteredProducts = await db.Product.findAll({
                include: [{ association: "product_detail", include: ["images", "size", "color"] }, "category"],
                where: {
                    category_id: category
                }
            })
            totalProducts = categories[category - 1].products.length
        } else {
            alteredProducts = await db.Product.findAll({
                include: [{ association: "product_detail", include: ["images", "size", "color"] }, "category"],
                limit: 4,
                offset: productsGroup
            })
            totalProducts = productsList.length
        }

        return {
            productsList,
            categories,
            alteredProducts,
            numberPage,
            totalProducts
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

        let colors = []
        if (typeof color === "string") {
            colors.push(color)
        } else {
            colors = color
        }

        const parentProduct = await db.Product.create({
            name,
            description,
            category_id: category
        }, {
            include: ["category"]
        })

        for (const color of colors) {
            const product = await db.ProductDetail.create({
                price,
                stock,
                product_id: parentProduct.id,
                size_id: size,
                color_id: Number(color)
            })

            if (files) {
                for (const image of files) {
                    db.Image.create({
                        name: image.originalname, // => cambiar a "name: image.filename". Lo Cambie para que se vea el nombre original.
                        product_detail_id: product.id
                    })
                }
            }
        }

        return true
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

        const images = await db.Image.findAll({
            where: { product_detail_id: prodSpecId }, raw: true
        })

        const imageIds = images.map(image => image.id)

        return {
            product,
            colors,
            sizes,
            categories,
            detail,
            chosenProductSpec,
            newProductsList,
            imageIds
        }
    },

    editarProducto: async ({ params, data, files, imgList }) => {
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

        for (let i = 0; i < files.length; i++) {
            if (imgList.length > i) {
                await db.Image.update({
                    name: files[i].filename
                }, {
                    where: { product_detail_id: productSpec, id: imgList[i] }
                })
            } else {
                if (files[i] === false) {
                    continue
                }
                await db.Image.create({
                    name: files[i].originalname,
                    product_detail_id: productSpec
                })
            }
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
    },

    carrito: async () => {
        const productsList = await db.Product.findAll({
            include: [{
                association: "product_detail",
                include: ["images"]
            }, "category"],
            group: "product_id"
        })

        return {
            productsList
        }
    }

}

module.exports = productModel
