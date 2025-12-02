// Importa el módulo express
const express = require('express');

// Crea una nueva ruta
const router = express.Router();

// Importa el controlador de búsqueda de películas
const {busquedaControlador} = require('../controllers/buscador.controllers');

// Define la ruta GET '/search' y asigna el controlador
router.get('/search', busquedaControlador);

// Exporta el router para que pueda ser usado en app.js
module.exports = router;


