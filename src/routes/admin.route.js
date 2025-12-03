// REQUERIMIENTOS DE TERCEROS
const express = require("express");
const router = express.Router();
const {check} = require("express-validator");

// REQUERIMIENTOS PROPIOS
// FUNCIONES CONTROLADORAS
const {crearPelicula, editarPelícula, eliminarPelícula} = require('../controllers/admin.controllers');

// MIDDLEWARES DE COMPROBACIÓN
//Comprobar año película
const {comprobarAnioPelicula} = require("../middlewares/comprobaraniopelicula")

// Comprobar nombre película
const {comprobarNombrePelicula} = require("../middlewares/comprobarnombrepelicula");

// CREAR PELÍCULA - /createMovie
router.post('/createmovie', [
    check("titulo")
    .notEmpty().withMessage("El campo título no puede estar vacío"),
    check("id_imagen")
    .notEmpty().withMessage("El campo imagen no puede estar vacío"),
    check("anio")
    .notEmpty().withMessage("El campo año no puede estar vacío")
    .isNumeric().withMessage("El campo año no puede contener letras"),
    check("director")
    .notEmpty().withMessage("El campo director no puede estar vacío"),
    check("genero")
    .notEmpty().withMessage("El campo genero no puede estar vacío"),
    check("duracion")
    .notEmpty().withMessage("El campo duración no puede estar vacío")
    .isNumeric().withMessage("El campo duración no puede contener letras"),
    comprobarNombrePelicula, 
    comprobarAnioPelicula], crearPelicula);
// Pendiente resolver tema checks

// OBTENER PELÍCULAS - /movies

// OBTENER PELÍCULA POR ID

// EDITAR PELÍCULA POR ID
router.put('/editmovie/:id', [
    check("titulo")
    .notEmpty().withMessage("El campo título no puede estar vacío"),
    check("id_imagen")
    .notEmpty().withMessage("El campo imagen no puede estar vacío"),
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
    ], editarPelícula);
// formulario como el de crear película pero con campos autorellenados con los datos almacenados localmente.

// BORRAR PELÍCULA POR ID
router.delete('/removemovie/:id'/*validaciones, checks*/, eliminarPelícula);

module.exports = router;