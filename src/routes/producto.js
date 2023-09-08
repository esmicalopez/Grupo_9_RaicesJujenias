const express = require("express");
const router = express.Router()

const controllers = require("../controllers/productoController")

// GET
router.get("/crearProducto", controllers.crearProducto)
router.get("/:id", controllers.detallesProducto)
router.get("/", controllers.productos)


//POST



module.exports = router