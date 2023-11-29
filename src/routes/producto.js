const express = require("express")
const router = express.Router()
const controllers = require("../controllers/productoController")
const { uploadProduct } = require("../middlewares/multerMid")
const sortImagesMiddleware = require("../middlewares/sortImagesMiddleware")

// GET
router.get("/crear", controllers.crearProductoView)
router.get("/:id/:productSpec/edit", controllers.editarProductoView)
router.get("/:id/:productSpec", controllers.detallesProducto)
router.get("/", controllers.productos)

// POST
router.post("/crear", uploadProduct.any("product-image"), sortImagesMiddleware, controllers.crearProducto)

// PUT
router.put("/:id/:productSpec/edit", uploadProduct.any("product-image"), sortImagesMiddleware, controllers.editarProducto)

// DELETE
router.delete("/:id/:productSpec/delete", controllers.eliminarProducto)

module.exports = router
