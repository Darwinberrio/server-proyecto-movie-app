// REQUERIMIENTOS DE TERCEROS
const {pool} = require('../config/dbConnect');

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
    console.log(titulo, anio);

    try {

        // Conectar a la BBDD
        client = await pool.connect();

        // Coger título y año  de la BBDD
        const peliculaExiste = await client.query(queries.peliculaExiste,[titulo, anio]);
        //console.log(peliculaExiste);

        // Posibilidad de que haya películas con el mismo nombre - Se filtra también por año
        //if(titulo === peliculaExiste.titulo && anio === peliculaExiste.anio) {

        if(peliculaExiste.rowCount==1) {
            return res.status(400).json({
                ok: false,
                msg: "La película ya existe, no se puede volver a crear"
            })
        }
        
        next();

    }catch (error){
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Ha habido un problema, contacte con el administrador"
        });
    } finally {
        client.release();
    }
};

// EXPORTAR MIDDLEWARES
module.exports = {comprobarNombreYAnioPelicula};


