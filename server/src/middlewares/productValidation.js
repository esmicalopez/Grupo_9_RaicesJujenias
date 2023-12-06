const { check } = require("express-validator")
const { sizeExists, colorExists, categoryExists, imageValidator } = require("../validators/customValidators")

const productCreateValidator = [
    check("name")
        .trim()
        .notEmpty().withMessage("El nombre no puede estar vacio.")
        .isLength({ min: 5, max: 150 }).withMessage("El nombre debe tener al menos 5 caracteres")
        .escape(),
    check("price")
        .trim()
        .notEmpty().withMessage("El producto debe tener un precio")
        .isNumeric({ no_symbols: true }).withMessage("El precio tiene que ser númerico y sin signos")
        .isFloat({ min: 20 }).withMessage("el precio del producto debe ser mayor a $20")
        .escape(),
    check("stock")
        .trim()
        .notEmpty().withMessage("El producto debe tener una cantidad de stock")
        .isNumeric({ no_symbols: true }).withMessage("El stock tiene que ser númerico y sin signos")
        .isInt({ allow_leading_zeroes: false, min: 1 })
        .escape(),
    check("category")
        .notEmpty().withMessage("Tienes que elegir la categoria del producto.")
        .custom(categoryExists),
    check("size")
        .notEmpty().withMessage("Tienes que elegir el tamaño del producto.")
        .custom(sizeExists),
    check("color")
        .notEmpty().withMessage("Tienes que elegir el color del producto.")
        .custom(colorExists),
    check("product-image")
        .custom(imageValidator),
    check("description")
        .trim()
        .notEmpty().withMessage("Tienes que agregar uan descripcion del producto.")
        .isLength({ min: 20 }).withMessage("La descripcion tiene que tener al menos 20 caracteres")
        .escape()
]

const productEditValidator = [
    check("name")
        .trim()
        .notEmpty().withMessage("El nombre no puede estar vacio.")
        .isLength({ min: 5, max: 150 }).withMessage("El nombre debe tener al menos 5 caracteres")
        .escape(),
    check("price")
        .trim()
        .notEmpty().withMessage("El producto debe tener un precio")
        .isNumeric({ no_symbols: true }).withMessage("El precio tiene que ser númerico y sin signos")
        .isFloat({ min: 20 }).withMessage("el precio del producto debe ser mayor a $20")
        .escape(),
    check("offer")
        .trim()
        .isNumeric({ no_symbols: true }).withMessage("La oferta tiene que ser un número y sin signos")
        .isInt({ min: 0, max: 99 }).withMessage("La oferta tiene un maximo de 99%")
        .escape(),
    check("stock")
        .trim()
        .notEmpty().withMessage("El producto debe tener una cantidad de stock")
        .isNumeric({ no_symbols: true }).withMessage("El stock tiene que ser númerico y sin signos")
        .isInt({ allow_leading_zeroes: false, min: 1 })
        .escape(),
    check("category")
        .notEmpty().withMessage("Tienes que elegir la categoria del producto.")
        .custom(categoryExists),
    check("size")
        .notEmpty().withMessage("Tienes que elegir el tamaño del producto.")
        .custom(sizeExists),
    check("color")
        .notEmpty().withMessage("Tienes que elegir el color del producto.")
        .custom(colorExists),
    check("product-image")
        .custom(imageValidator),
    check("description")
        .trim()
        .notEmpty().withMessage("Tienes que agregar uan descripcion del producto.")
        .isLength({ min: 20 }).withMessage("La descripcion tiene que tener al menos 20 caracteres")
        .escape()
]

module.exports = { productCreateValidator, productEditValidator }
