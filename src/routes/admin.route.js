// REQUERIMIENTOS DE TERCEROS
const express = require("express");
const router = express.Router();

// REQUERIMIENTOS PROPIOS
const {validarCrearPelicula, validarEditarPelicula} = require("../validators/crud-admin.validator")

const { validarCampos } = require("../middlewares/validarCampos");

// FUNCIONES CONTROLADORAS
const {crearPelicula, editarPelícula, eliminarPelícula} = require('../controllers/admin.controllers');

// MIDDLEWARES DE COMPROBACIÓN
//Comprobar año y nombre de película
const {comprobarNombreYAnioPelicula} = require("../middlewares/comprobarnombreanopelicula")

// CREAR PELÍCULA - /createMovie
router.post('/createmovie', [comprobarNombreYAnioPelicula, validarCrearPelicula, validarCampos], crearPelicula);

// OBTENER PELÍCULAS - /movies

// OBTENER PELÍCULA POR ID

// EDITAR PELÍCULA POR ID
router.put('/editmovie/:id', [validarEditarPelicula, validarCampos], editarPelícula);

// BORRAR PELÍCULA POR ID
router.delete('/removemovie/:id', eliminarPelícula);

// EXPORTAR RUTAS
module.exports = router;