const express = require("express");
const router = express.Router()

const controllers = require("../controllers/productoController")

router.get("/", controllers.productos)

router.get("/:id", controllers.detallesProducto)

module.exports = router