const express = require("express");
const router = express.Router()

const controllers = require("../controllers/productoController")

router.get("/:id", controllers.detallesProducto)
router.get("/", controllers.productos)



module.exports = router