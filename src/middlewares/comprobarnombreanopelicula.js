// REQUERIMIENTOS DE TERCEROS
const {pool} = require('../config/dbConnect');
const fs = require("node:fs/promises");

// REQUERIMIENTOS PROPIOS
const {queries} = require('../db/queries');

// MIDDLEWARES
/**
 * Función que comprueba el título y año de una película en la tabla películas antes de crearla
 * @param {Object} req 
 * @param {Object} res 
 * @param {Metodo} next 
 * @returns Promise - Comprueba si la película ya existe en la tabla películas y pasa al siguiente middleware o devuelve errores (500 o 400)
 */


const comprobarNombreYAnioPelicula = async (req, res, next) => {
    // Acceso a BBDD
    let client;
    // Datos
    let result;

    // Capturar los elementos deseados - data de la película
    const {titulo, anio} = req.body;
    //console.log(titulo, anio);

    try {

        // Conectar a la BBDD
        client = await pool.connect();

        // Coger título y año  de la BBDD
        const peliculaExiste = await client.query(queries.peliculaExiste,[titulo, anio]);

        //console.log(peliculaExiste);

        // Posibilidad de que haya películas con el mismo nombre - Se filtra también por año
        if(peliculaExiste.rowCount==1) {

            // si la pelicula existe, se borra la imagen subida
            if (req.file) {
                try {
                   console.log('Borrando archivo temporal:', req.file.path);
                   await fs.unlink(req.file.path);
                } catch (err) {
                   console.error('Error borrando archivo temporal:', err);
                }
            }
            //resultado para front
            return res.status(400).json({
                ok: false,
                msg: "La película ya existe, no se puede volver a crear"
            })
        }
        
        //devuelve el control al siguiente middleware
        next();

    }catch (error){
        //console.log(error);

        // también limpiamos archivo en caso de error
        if (req.file) {
        try {
            await fs.unlink(req.file.path);
        } catch (err) {
            console.error('Error borrando archivo tras error:', err);
        }
        }
        return res.status(500).json({
            ok: false,
            msg: "Ha habido un problema, contacte con el administrador"
        });
    } finally {
        client.release();
    }
};

// EXPORTAR MIDDLEWARES
module.exports = {comprobarNombreYAnioPelicula};


