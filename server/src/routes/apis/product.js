const express = require("express")
const router = express.Router()
const controllers = require("../../controllers/apis/productControllerAPI")

// GET
router.get("/", controllers.productos)
router.get("/:id", controllers.detalleProducto)

module.exports = router
