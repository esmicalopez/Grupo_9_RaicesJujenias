const express = require("express");
const router = express.Router()
const multer = require("multer");
const path = require("path")

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../../assets/images/products"))
    },
    filename: (req, file, cb) => {
        cb(null, "prodImg-" + Date.now() + path.extname(file.originalname))
    }
})
const update = multer({storage})

const controllers = require("../controllers/productoController");

// GET
router.get("/crear", controllers.crearProductoView)
router.get("/:id/edit", controllers.editarProductoView)
router.get("/:id", controllers.detallesProducto)
router.get("/", controllers.productos)

//POST
router.post("/crear", update.single("product-image") ,controllers.crearProducto)

//PUT
router.put("/:id/edit", update.single("product-image"),controllers.editarProducto)

//DELETE
router.delete("/:id/eliminar", controllers.eliminarProducto)

module.exports = router