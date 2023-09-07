const express = require("express");
const router = express.Router()

const controllers = require("../controllers/productoController")

// GET
router.get("/:id", controllers.detallesProducto)
router.get("/", controllers.productos)

//POST



module.exports = router