const express = require("express");
const router = express.Router()

const controllers = require("../controllers/productoController")

// GET
router.get("/crear", controllers.crearProductoView)
router.get("/:id/edit", controllers.editarProductoView)
router.get("/:id", controllers.detallesProducto)
router.get("/", controllers.productos)

//POST
router.post("/crear", controllers.crearProducto)

//PUT
router.put("/:id/edit", controllers.editarProducto)

//DELETE
router.delete("/:id/eliminar", controllers.eliminarProducto)

module.exports = router