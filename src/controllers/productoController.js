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
        const id = req.params.id
        const prodSpecId = req.params.productSpec

        const product = await db.Product.findByPk(id)
        if (product) {
            const detail = await db.ProductDetail.findAll({
                where: { product_id: id },
                include: ["color", "size"]
            })
            const chosenProductSpec = await db.ProductDetail.findByPk(prodSpecId, {
                include: ["images", "color", "size"]
            })
            const newProductsList = await db.ProductDetail.findAll({
                where: {
                    product_id: {
                        [Op.ne]: id
                    }
                },
                include: ["product", "images"],
                group: "product_id"
            })
            return res.render("detallesProducto", {
                product,
                detail,
                chosenProductSpec,
                newProductsList,
                offerCalc
            })
        } else {
            return res.send("Producto no encontrado")
        }
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
        const id = req.params.id
        const prodSpecId = req.params.productSpec

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
        const product = await db.Product.findByPk(id)

        if (product) {
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
        } else {
            return res.send("Producto no encontrado")
        }
    }
    /*
    editarProducto: (req, res) => {
        const productsUpdated = []
        productsList.forEach(function (p) {
            if (p.id === +req.params.id) {
                p.name = req.body.name
                p.price = +req.body.price
                p.description = req.body.description
                p.offer = +req.body.offer
                p.category = req.body.category
                p.image = req.file ? req.file.filename : p.image
                p.author = req.body.author
                p.sizes = [req.body.size]
                p.colors = req.body.colors.split(",") || ""
                p.stock = req.body.stock
            }
            productsUpdated.push(p)
        })

        fs.writeFileSync(path.join(__dirname, "../data/products.json"), JSON.stringify(productsUpdated, null, 4))

        res.redirect(`/productos/${+req.params.id}`)
    },

    eliminarProducto: (req, res) => {
        if (!req.session.user) { // Unauthorized
            return res.sendStatus(401)
        }

        if (req.session.user && req.session.user.rol !== "admin") { // Forbidden
            return res.sendStatus(403)
        }

        productsList = productsList.filter((p) => p.id !== +req.params.id)

        fs.writeFileSync(path.join(__dirname, "../data/products.json"), JSON.stringify(productsList, null, 4))

        res.redirect("/productos")
    } */

}

module.exports = controllers
