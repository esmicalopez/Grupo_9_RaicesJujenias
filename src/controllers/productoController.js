const db = require("../database/models")
const Op = db.Sequelize.Op
// Calculo del descuento
const offerCalc = require("../functions/offerCalcule")

//  Controladores
const controllers = {
    productos: async (req, res) => {
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
        res.render("productos", {
            productsList,
            categories,
            offerCalc
        })
    },

    detallesProducto: async (req, res) => {
        const { id, productSpec: prodSpecId } = req.params

        const product = await db.Product.findByPk(id)

        if (!product) return res.send("Producto no encontrado")

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

        const colors = await db.Color.findAll()
        const sizes = await db.Size.findAll()
        const categories = await db.Category.findAll()

        return res.render("createProduct", { colors, sizes, categories })
    },

    crearProducto: async (req, res, next) => {
        const product = await db.ProductDetail.create({
            price: req.body.price,
            stock: req.body.stock,
            product: {
                name: req.body.name,
                description: req.body.description,
                category_id: req.body.category
            },
            size_id: req.body.size,
            color_id: req.body.color
        }, {
            include: [{ association: "product", include: ["category"] }]
        })

        for (const image of req.files) {
            db.Image.create({
                name: image.filename,
                product_detail_id: product.id
            })
        }

        return res.redirect("/productos")
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

        const colors = await db.Color.findAll()
        const sizes = await db.Size.findAll()
        const categories = await db.Category.findAll()
        const product = await db.Product.findByPk(id, { include: ["category"] })

        if (!product) return res.send("Producto no encontrado")

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
        const { id, productSpec } = req.params
        const { name, price, offer, stock, color, size, category, description } = req.body

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

        if (!req.files.length > 0) {
            return res.redirect("/productos")
        }

        console.log(req.files)
        for (const image of req.files) {
            db.Image.update({
                name: image.filename
            }, {
                where: { product_detail_id: productSpec, id } // hablar de esto
            })
        }

        res.redirect("/productos")
    },

    eliminarProducto: (req, res) => {
        const { id, productSpec } = req.params

        if (!req.session.user) { // Unauthorized
            return res.sendStatus(401)
        }

        console.log(req.session)
        if (!req.session.user && req.session.user.rol !== "admin") { // Forbidden
            return res.sendStatus(403)
        }

        const deleteProduct = db.Product.destroy({
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

        return res.redirect("/productos")
    }

}

module.exports = controllers
