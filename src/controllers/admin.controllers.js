// REQUERIMIENTOS DE TERCEROS
const {pool} = require('../config/dbConnect');

// REQUERIMIENTOS PROPIOS
const {queries} = require('../db/queries');

// PENDIENTE MULTER IMÁGENES
// CREAR PELÍCULA - /createMovie
/**
 * Función que para crear películas
 * @param {Object} req 
 * @param {Object} res 
 * @returns Promise - Crea la película en la tabla películas o devuelve errores (500 o 404)
 */
const crearPelicula = async (req, res) => {
    //Renderizar vista - Pendiente

    // Conexión a la BBDD
    let client;
    // Datos
    let result;

    // Capturar los elementos deseados - data de la película
    const {titulo, anio, director, genero, duracion,url_imagen} = req.body;

    //comprobacion de file en back
    //console.log('Recogiendo file desde back:',req.file)
     

    try{
        // Conectar a la BBDD
        client = await pool.connect();

        // Comprobar si la película existe o no a través de título y año 
        const peliculaExiste = await client.query(queries.peliculaExiste,[titulo, anio]);

        if (peliculaExiste.rows.length > 0) {
            return res.status(400).json({ 
                ok: false, 
                msg: "No se puede crear la película porque ya existe" 
            });
        };

        // Si no existe la película crearla
        result = await client.query(queries.crearPelicula,[titulo, url_imagen, anio, director, genero, duracion]);

        return res.status(201).json({
            ok: true,
            msg: "Película creada de forma correcta",
            data: result.rows[0]
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: "Ha habido un problema, contacte con el administrador"
        });

    } finally {
        client.release();
    };
};

// OBTENER PELÍCULAS - /movies
/**
 * Función que recoge todas las películas para el admiistrador
 * @param {Object} req 
 * @param {Objetc} res 
 * @returns Promise 
 */
const obtenerTodasPeliculas = async (req, res) => {
    //Renderizar vista - Pendiente

    // Conexión a la BBDD
    let client;
    // Datos
    let result;

    try {

        // Conectar a la BBDD
        client = await pool.connect();

        // Capturar token admin en cookies o header
        const token = req.cookies?.token || req.headers["authorization"]?.split(" ")[1];
        //console.log(token)

        // Obtener todas las películas
        result = await client.query(queries.obtenerTodasPeliculas);

        // Si no hay películas en tabla   
        if(result.rows.length === 0) {
            return res.status(404).json({
                ok:false,
                mensaje:'No hay películas para mostrar'
            });
        };

        return res.status(200).json({
            ok: true,
            mensaje: "Se han encontrado todas las películas correctamente",
            data: result
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            mensaje: "Ha habido un error, contacte con el administrador"
        });

    } finally {
        client.release();
    };
};

// OBTENER PELÍCULA POR ID
const obtenerPeliculabyId = async (req, res) => {
    // Conexión a la BBDD
    let client;
    // Datos
    let result;

    // Obtener id de params 
    const {id} = req.params;

    try {

        // Conectar a la BBDD
        client = await pool.connect();

        // Capturar token admin en cookies o header
        const token = req.cookies?.token || req.headers["authorization"]?.split(" ")[1];
        //console.log(token)

        // Obtener película por id
        result = await client.query(queries.obtenerPeliculabyIdAdmin,[id]);
        //console.log(result);

        // Si no encuentra la película
        if(result.rows.length === 0) {
            return res.status(404).json({
                ok: false,
                mensaje: "No se ha encontrado la película"
            });
        };

        // Obtener datos de película
        const {id_pelicula,titulo, url_imagen, anio, director, genero, duracion} = result.rows[0];

        // Si existe devolverla
        return res.status(200).json({
            ok: true,
            mensaje: "La película se ha encontrado correctamente",
            data: {
                id_pelicula,
                titulo,
                url_imagen,
                anio,
                director,
                genero,
                duracion
            }
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            mensaje: "Ha habido un error, contacte con el administrador"
        });
    } finally {
        client.release();
    };
};

// EDITAR PELÍCULA POR ID - /editMovie/:id
/**
 * Función que edita una película por su ID
 * @param {Object} req 
 * @param {Object} res 
 * @returns Promise - Edita la película en la tabla películas y tabla favoritos o devuelve errores (500 o 404)
 */
const editarPelícula = async (req, res) => {
    // Renderizar vista - Pendiente

    // Conexión a la BBDD
    let client;
    // Datos
    let result;
    
    // Capturar id
    const {id} = req.params;

    console.log(id)

    console.log(req.body)
    try {
        // Conectar a la BBDD
        client = await pool.connect();

        // Comprobar si la película existe o no a través de id
        const peliculaExisteEditar = await client.query(queries.findPeliculabyId,[id]); 

        if (!id || peliculaExisteEditar.rows.length === 0) {
            return res.status(404).json({
                ok: false,
                msg: "No se puede editar la película porque no existe"
            });
        };

        //si la imagen es null, actualiza todo menos imagen
        if(!req.body.url_imagen){
            // Capturar los elementos deseados - data de la película
            const {titulo, anio, director, genero, duracion} = req.body;
            // Editar la película en tabla películas
            result = await client.query(queries.actualizarPeliculaById,[titulo, anio, director, genero, duracion, id]);
        
        }else{
            const {titulo, url_imagen, anio, director, genero, duracion} = req.body;
            result = await client.query(queries.actualizarPeliculaById2,[titulo, url_imagen, anio, director, genero, duracion, id]);
        }
        
        
        //console.log(titulo, url_imagen, anio, director, genero, duracion);

        
        //console.log(result.rows[0])

        return res.status(200).json({
            ok: true,
            msg: "Película modificada correctamente",
            data: result.rows[0]
        });

    } catch(error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: "Ha habido un problema, contacte con el administrador"
        });
    } finally {
        client.release();
    };
};

// BORRAR PELÍCULA POR ID - /removieMovie
/**
 * Función que elimina una película por su ID
 * @param {Object} req 
 * @param {Object} res 
 * @returns Promise - Elimina la película en la tabla películas y tabla favoritos o devuelve errores (500 o 404)
 */
const eliminarPelícula = async (req, res) => {
    // Renderizar vista - Pendiente

    // Conexión a la BBDD
    let client;
    // Datos
    let result;

    // Capturar id
    const {id} = req.params;
    //console.log(id);

    try {
        // Conectar a la BBDD
        client = await pool.connect();

        // Comprobar si la película existe o no a través de id
        const peliculaExisteEliminar = await client.query(queries.peliculaExisteById,[id]); 

        if (!id || peliculaExisteEliminar.rows.length === 0) {
            return res.status(404).json({
                ok: false,
                msg: "No se puede editar la película porque no existe"
            });
        };
        
        // Eliminar película de tabla favoritos
        const peliculaEliminadaFavs = await client.query(queries.eliminarPeliculaTablaFavoritos,[id]);

        // Eliminar película de tabla películas
        result = await client.query(queries.eliminarPeliculaTablaPeliculas,[id]); // De los params
        
        return res.status(200).json({
            ok: true,
            msg: "Película eliminada correctamente",
        });

        // Pendiente mirar doble verificación

    } catch(error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: "Ha habido un problema, contacte con el administrador"
        });
    } finally {
        client.release();
    };
};

// EXPORTAR FUNCIONES CONTROLADORAS
module.exports = {
    crearPelicula,
    editarPelícula,
    eliminarPelícula,
    obtenerTodasPeliculas,
    obtenerPeliculabyId
};