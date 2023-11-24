const productModel = require("../models/products.js")
// Calculo del descuento
const offerCalc = require("../functions/offerCalcule")
const db = require("../database/models") // se usa en la session del User, en "crearProductoView"

//  Controladores
const controllers = {
    productos: async (req, res) => {
        const { productsList, categories } = await productModel.productos()

        res.render("productos", {
            productsList,
            categories,
            offerCalc
        })
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
        const product = await productModel.crearProducto({ data: req.body, files: req.files })

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

        const { colors, sizes, categories, product, detail, chosenProductSpec, newProductsList } = productData

        return res.render("editProduct", {
            colors,
            sizes,
            categories,
            product,
            detail,
            chosenProductSpec,
            newProductsList
        })
    },

    editarProducto: async (req, res) => {
        const { updateProduct, updateProductDetail } = await productModel.editarProducto({ params: req.params, data: req.body, files: req.files })

        if (updateProduct && updateProductDetail) {
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
