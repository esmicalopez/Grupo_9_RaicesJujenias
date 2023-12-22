const productModel = require("../models/products.js")
// Calculo del descuento
const offerCalc = require("../functions/offerCalcule")
const db = require("../database/models") // se usa en la session del User, en "crearProductoView"
// Express validator
const { validationResult } = require("express-validator")

//  Controladores
const controllers = {
    productos: async (req, res) => {
        const page = req.query.page ? Number(req.query.page) : 1
        const category = req.query.category ? Number(req.query.category) : false

        const products = await productModel.productos({ page, category })

        const { categories, alteredProducts, productsList, numberPage, totalProducts } = products

        res.render("productos", {
            alteredProducts,
            categories,
            offerCalc,
            productsList,
            numberPage,
            totalProducts,
            categoryId: category
        })
        console.log(totalProducts)
        // res.send(limitedProducts)
    },

    detallesProducto: async (req, res) => {
        const { id, productSpec: prodSpecId } = req.params

        const productData = await productModel.detallesProducto({ id, prodSpecId })

        if (!productData) return res.send("Producto no encontrado")

        const { product, detail, chosenProductSpec, newProductsList } = productData

        return res.render("detallesProducto", {
            product,
            detail,
            chosenProductSpec,
            newProductsList,
            offerCalc
        })
    },

    crearProductoView: async (req, res) => {
        if (!req.session.userLogged) { // Unauthorized
            return res.redirect("/")
        }

        if (req.session.userLogged) { // Forbidden
            const user = await db.User.findByPk(req.session.user)
            if (user.rol_id !== 1) {
                return res.redirect("/")
            }
        }

        const { colors, sizes, categories } = await productModel.crearProductoView()

        return res.render("createProduct", { colors, sizes, categories })
    },

    crearProducto: async (req, res) => {
        //  -- Express-validator
        console.log(req.body)
        const erroresExpressValidator = validationResult(req)

        if (!erroresExpressValidator.isEmpty()) {
            const { colors, sizes, categories } = await productModel.crearProductoView()
            return res.render("createProduct", {
                errores: erroresExpressValidator.array({ onlyFirstError: true }), colors, sizes, categories
            })
        }

        const product = await productModel.crearProducto({ data: req.body, files: req.newFiles })

        if (product) {
            return res.redirect("/productos")
        }
    },

    editarProductoView: async (req, res) => {
        const { id, productSpec: prodSpecId } = req.params

        if (!req.session.userLogged) { // Unauthorized
            return res.redirect("/")
        }

        if (req.session.userLogged) { // Forbidden
            const user = await db.User.findByPk(req.session.user)
            if (user.rol_id !== 1) {
                return res.redirect("/")
            }
        }

        const productData = await productModel.editarProductoView({ id, prodSpecId })

        if (!productData) return res.send("Producto no encontrado")

        const { colors, sizes, categories, product, detail, chosenProductSpec, newProductsList, imageIds } = productData

        return res.render("editProduct", {
            colors,
            sizes,
            categories,
            product,
            detail,
            chosenProductSpec,
            newProductsList,
            imageIds: JSON.stringify(imageIds)
        })
    },

    editarProducto: async (req, res) => {
        // -- Express Validator
        const erroresExpressValidator = validationResult(req)

        if (!erroresExpressValidator.isEmpty()) {
            const { id, productSpec: prodSpecId } = req.params
            const productData = await productModel.editarProductoView({ id, prodSpecId })

            if (!productData) return res.send("Producto no encontrado")

            const { colors, sizes, categories, product, detail, chosenProductSpec, newProductsList, imageIds } = productData

            return res.render("editProduct", {
                errores: erroresExpressValidator.array({ onlyFirstError: true }),
                colors,
                sizes,
                categories,
                product,
                detail,
                chosenProductSpec,
                newProductsList,
                imageIds: JSON.stringify(imageIds)
            })
        }

        const { updateProduct, updateProductDetail } = await productModel.editarProducto({ params: req.params, data: req.body, files: req.newFiles, imgList: JSON.parse(req.query.imgList) })

        if (updateProduct && updateProductDetail) {
            console.log(updateProductDetail)
            res.redirect("/productos")
        }
    },

    eliminarProducto: async (req, res) => {
        const { id, productSpec } = req.params

        if (!req.session.user) { // Unauthorized
            return res.sendStatus(401)
        }

        if (!req.session.user && req.session.user.rol !== "admin") { // Forbidden
            return res.sendStatus(403)
        }
        const deleteProduct = await productModel.eliminarProducto({ id, productSpec })

        if (deleteProduct) return res.redirect("/productos")
    }

}

module.exports = controllers
