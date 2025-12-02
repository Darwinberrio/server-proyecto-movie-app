//const cookieParser = require("cookie-parser");
const { pool } = require('../config/dbConnect');

//importacion de queries
const {queries}= require('../db/queries');



const mostrarFavoritos=async(req,res)=>{

    try {

        //CAPTURA TOKEN ALMACENADO EN COOKIES!!
        //const token =req.cookies.token; 
        

        //valor temporal para pruebas
        const token={
            idUsuario:1,
            rol:'USER'
        }
    
        //query para verificar que el usuario existe
        //const userExists=await pool.query(queries.findUserbyID,[idUsuario]);

        //devuelve un objeto vacio cuando no lo encuentra
        //console.log(userExists);
        
        //si el rowcount es 0 significa que no ha encontrado el usuario
        if(userExists.rowCount===0){
           return res.status(404).json({
            ok:false,
            msg:'El usuario no existe'
           })
        }

        //get favoritos by ID usuario
        const resultFavoritos=await pool.query(queries.favoritosByID,[idUsuario]);
        //console.log(resultFavoritos.rows);

        return res.status(200).json({
            ok:true,
            msg:'Favoritos de usuario encontrados',
            user:userExists,
            favoritos:resultFavoritos.rows
            //token:token
        })

    } catch (error) {
        console.log(error)
    }   
} 

module.exports={mostrarFavoritos}