// REQUERIMIENTOS DE TERCEROS

// REQUERIMIENTOS PROPIOS
const {pool} = require('../config/dbConnect');
const {queries} = require('../db/queries');
const {crearImagenPelicula} = require('../helpers/crearimagenpelicula');

// CREAR PELÍCULA - /createMovie
const crearPelicula = async (req, res) => {
    //Renderizar vista - Pendiente

    // Conexión a la BBDD
    let client;
    // Datos
    let result;

    // Capturar los elementos deseados - data de la película
    const {titulo, id_imagen, anio, director, genero, duracion} = req.body;
    //console.log(req.body);

    try{
        // Conectar a la BBDD
        client = await pool.connect();

        // Comprobar si la película existe o no a través de título y año 
        const peliculaExiste = await client.query(queries.peliculaExiste,[titulo, anio]);

        crearPelicula;
        //console.log(crearPelicula)

        if (peliculaExiste.rows.length > 0) {
            return res.status(400).json({ 
                ok: false, 
                mensaje: "No se puede crear la película porque ya existe" 
            });
        };

        // Crear primero la imagen (helper) - Capturar el id y pasarlo como argumento return id imagen
        // Si no existe la película crearla
        result = await client.query(queries.crearPelicula,[titulo, id_imagen, anio, director, genero, duracion]);

        return res.status(201).json({
            ok: true,
            mensaje: "Película creada de forma correcta",
            data: result.rows[0]
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            mensaje: "Ha habido un problema, contacte con el administrador"
        });

    } finally {
        if (client) client.release();
    };
};
// Vista - formulario completo  con validación

// OBTENER PELÍCULAS - /movies

// OBTENER PELÍCULA POR ID

// EDITAR PELÍCULA POR ID - /editMovie/:id
// SI QUIERES CAMBIAR LA IMAGEN??
const editarPelícula = async (req, res) => {
    // Renderizar vista - Pendiente

    // Conexión a la BBDD
    let client;
    // Datos
    let result;

    // Capturar id
    const {id} = req.params;
     // Pendiente poner confirmación si existe película 
    try {
        // Conectar a la BBDD
        client = await pool.connect();

        // Como la película ya existe, editarla
        // Capturar los elementos deseados - data de la película
        const {titulo, id_imagen, anio, director, genero, duracion} = req.body;
        //console.log(titulo, id_imagen, anio, director, genero, duracion);

        result = await client.query(queries.actualizarPeliculaById,[titulo, id_imagen, anio, director, genero, duracion, id]);
        //console.log(result.rows[0])

        // Editar también en favoritos

        return res.status(200).json({
            ok: true,
            mensaje: "Película modificada correctamente",
            data: result.rows[0]
        });

    } catch(error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            mensaje: "Ha habido un problema, contacte con el administrador"
        });
    } finally {
        client.release();
    };
};
// formulario como el de crear película pero con campos autorellenados con los datos almacenados localmente.

// BORRAR PELÍCULA POR ID - /removieMovie
const eliminarPelícula = async (req, res) => {
    // Renderizar vista - Pendiente

    // Conexión a la BBDD
    let client;
    // Datos
    let result;

    // Capturar id
    const {id} = req.params;
    console.log(id);

    try {
        // Conectar a la BBDD
        client = await pool.connect();

        // Como ya existe primero eliminarla de favoritos
        const peliculaEliminadaFavs = await client.query(queries.eliminarPeliculaTablaFavoritos,[id]);

        // Eliminarla de películas
        result = await client.query(queries.eliminarPeliculaTablaPeliculas,[id]); // De los params
        
        return res.status(200).json({
            ok: true,
            mensaje: "Película eliminada correctamente",
        });

        // Pendiente mirar doble verificación

    } catch(error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            mensaje: "Ha habido un problema, contacte con el administrador"
        });
    } finally {
        client.release();
    };
};

module.exports = {
    crearPelicula,
    editarPelícula,
    eliminarPelícula
};