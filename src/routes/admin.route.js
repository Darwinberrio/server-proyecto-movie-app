// REQUERIMIENTOS DE TERCEROS
const express = require("express");
const router = express.Router();

// REQUERIMIENTOS PROPIOS
const {validarCrearPelicula, validarEditarPelicula} = require("../validators/crud-admin.validator");
const {validarJWT} = require("../middlewares/validarJWT");

const { validarCampos } = require("../middlewares/validarCampos");

// FUNCIONES CONTROLADORAS
const {crearPelicula, editarPelícula, eliminarPelícula, obtenerTodasPeliculas, obtenerPeliculabyId} = require('../controllers/admin.controllers');

// MIDDLEWARES DE COMPROBACIÓN
//Comprobar año y nombre de película
const {comprobarNombreYAnioPelicula} = require("../middlewares/comprobarnombreanopelicula")

// CREAR PELÍCULA - /createMovie
router.post('/createmovie', [validarJWT, comprobarNombreYAnioPelicula, validarCrearPelicula, validarCampos], crearPelicula);

// OBTENER PELÍCULAS - /movies
router.get('/all', [validarJWT], obtenerTodasPeliculas);

// OBTENER PELÍCULA POR ID
router.get('/:id', [validarJWT], obtenerPeliculabyId);

// EDITAR PELÍCULA POR ID
router.put('/editmovie/:id', [validarJWT, validarEditarPelicula, validarCampos], editarPelícula);

// BORRAR PELÍCULA POR ID
router.delete('/removemovie/:id', [validarJWT], eliminarPelícula);

// EXPORTAR RUTAS
module.exports = router;