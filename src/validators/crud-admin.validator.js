// EXPORTACIONES DE TERCEROS
const { check } = require("express-validator");

// EXPORTACIONES PROPIAS

// VALIDADORES
/**
 * Validadores de campos para crear películas
 */
const validarCrearPelicula = [
    check("titulo")
    .notEmpty().withMessage("El campo título no puede estar vacío"),
    check("url_imagen")
    .notEmpty().withMessage("El campo imagen no puede estar vacío")
    .isString().withMessage("El campo imagen no puede ser números"),
    check("anio")
    .notEmpty().withMessage("El campo año no puede estar vacío")
    .isNumeric().withMessage("El campo año no puede contener letras"),
    check("director")
    .notEmpty().withMessage("El campo director no puede estar vacío"),
    check("genero")
    .notEmpty().withMessage("El campo genero no puede estar vacío"),
    check("duracion")
    .notEmpty().withMessage("El campo duración no puede estar vacío")
    .isNumeric().withMessage("El campo duración no puede contener letras")
];

/**
 * Validadores de campos para editar películas
 */
const validarEditarPelicula = [
    check("titulo")
    .notEmpty().withMessage("El campo título no puede estar vacío"),
    check("url_imagen")
    .notEmpty().withMessage("El campo imagen no puede estar vacío")
    .isString().withMessage("El campo imagen no puede ser números"),
    check("anio")
    .notEmpty().withMessage("El campo año no puede estar vacío")
    .isNumeric().withMessage("El campo año no puede contener letras"),
    check("director")
    .notEmpty().withMessage("El campo director no puede estar vacío"),
    check("genero")
    .notEmpty().withMessage("El campo genero no puede estar vacío"),
    check("duracion")
    .notEmpty().withMessage("El campo duración no puede estar vacío")
    .isNumeric().withMessage("El campo duración no puede contener letras")
];

// EXPORTAR VALIDADORES
module.exports = {validarCrearPelicula, validarEditarPelicula};