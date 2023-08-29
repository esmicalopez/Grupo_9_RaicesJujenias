const express = require("express");
const router = express.Router()

const controllers = require("../controllers/productoController")

router.get("/:id?", controllers.producto)

module.exports = router