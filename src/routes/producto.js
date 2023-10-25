const express = require("express")
const router = express.Router()
const controllers = require("../controllers/productoController")
const { uploadProduct } = require("../middlewares/multerMid")

// GET
router.get("/crear", controllers.crearProductoView)
router.get("/:id/edit", controllers.editarProductoView)
router.get("/:id", controllers.detallesProducto)
router.get("/", controllers.productos)

// POST
router.post("/crear", uploadProduct.single("product-image"), controllers.crearProducto)

// PUT
router.put("/:id/edit", uploadProduct.single("product-image"), controllers.editarProducto)

// DELETE
router.delete("/:id/eliminar", controllers.eliminarProducto)

module.exports = router
