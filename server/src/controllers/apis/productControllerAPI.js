const productModel = require("../../models/apis/productsAPI")
/* ● api/products/:id
○ Deberá devolver un objeto literal con la siguiente estructura:
■ una propiedad por cada campo en base.
■ un array por cada relación de uno a muchos (categories, colors,
sizes, etc).
■ Una URL para la imagen del producto (para mostrar la imagen). */

//  Controladores
const controllers = {
    productos: async (req, res) => {
        try {
            const products = await productModel.productos()

            const { productList, categoryList } = products

            return res.status(200).json({
                status: 200,
                data: {
                    count: productList.length,
                    countByCategory: categoryList,
                    products: productList
                }
            })
        } catch (error) {
            res.json(error)
        }
    },

    detalleProducto: async (req, res) => {
        const { id } = req.params

        const productData = await productModel.detalleProducto({ id })

        const { product, productDetail } = productData

        if (!product) {
            return res.status(404).json({
                error: {
                    msg: "producto no encontrado",
                    status: 404
                }
            })
        }

        return res.status(200).json({
            status: 200,
            data: {
                product,
                productDetail
            }
        })
    }

}

module.exports = controllers
