// REQUERIMIENTOS DE TERCEROS
const express = require("express");
const router = express.Router();

const multer = require('multer');
const upload = multer({ dest: 'public/uploads' })

// REQUERIMIENTOS PROPIOS
const {validarCrearPelicula, validarEditarPelicula} = require("../validators/crud-admin.validator")

const { validarCampos } = require("../middlewares/validarCampos");

const { saveImageMiddleware} = require("../middlewares/uploadImage");

// FUNCIONES CONTROLADORAS
const {crearPelicula, editarPelícula, eliminarPelícula} = require('../controllers/admin.controllers');

// MIDDLEWARES DE COMPROBACIÓN
//Comprobar año película
const {comprobarNombreYAnioPelicula} = require("../middlewares/comprobarnombreanopelicula")

// CREAR PELÍCULA - /createMovie
router.post('/createmovie', upload.single('url_imagen'),[saveImageMiddleware,comprobarNombreYAnioPelicula, validarCrearPelicula, validarCampos,], crearPelicula);

// OBTENER PELÍCULAS - /movies

// OBTENER PELÍCULA POR ID

// EDITAR PELÍCULA POR ID
router.put('/editmovie/:id', [validarEditarPelicula, validarCampos], editarPelícula);

// BORRAR PELÍCULA POR ID
router.delete('/removemovie/:id', eliminarPelícula);

module.exports = router;