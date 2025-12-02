const express=require('express')
const router = express.Router();

//const {middlewares}=require('../middlewares/')

//importacion de controllers
const {mostrarFavoritos}= require('../controllers/movie.controllers')

//REGISTER
router.get('/movies',/* [verifyRole],*/ mostrarFavoritos )

module.exports=router