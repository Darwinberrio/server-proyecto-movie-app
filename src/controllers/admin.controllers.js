// REQUERIMIENTOS DE TERCEROS
const {pool} = require('../config/dbConnect');

// REQUERIMIENTOS PROPIOS
const {queries} = require('../db/queries');

// PENDIENTE MULTER IMÁGENES
// CREAR PELÍCULA - /createMovie
const crearPelicula = async (req, res) => {
    //Renderizar vista - Pendiente

    // Conexión a la BBDD
    let client;
    // Datos
    let result;

    console.log(req.body);

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
// Vista - formulario completo  con validación

// OBTENER PELÍCULAS - /movies

// OBTENER PELÍCULA POR ID

// EDITAR PELÍCULA POR ID - /editMovie/:id
const editarPelícula = async (req, res) => {
    // Renderizar vista - Pendiente

    // Conexión a la BBDD
    let client;
    // Datos
    let result;

    // Capturar id
    const {id} = req.params;

    try {
        // Conectar a la BBDD
        client = await pool.connect();

        // Comprobar si la película existe o no a través de id
        const peliculaExisteEditar = await client.query(queries.peliculaExisteById,[id]); 

        if (!id || peliculaExisteEditar.rows.length === 0) {
            return res.status(404).json({
                ok: false,
                msg: "No se puede editar la película porque no existe"
            });
        };

        // Capturar los elementos deseados - data de la película
        const {titulo, url_imagen, anio, director, genero, duracion} = req.body;
        //console.log(titulo, url_imagen, anio, director, genero, duracion);

        // Editar la película en tabla películas
        result = await client.query(queries.actualizarPeliculaById,[titulo, url_imagen, anio, director, genero, duracion, id]);
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

module.exports = {
    crearPelicula,
    editarPelícula,
    eliminarPelícula
};