// Importa el pool de conexiones a la base de datos desde la configuración
const { pool } = require('../config/dbConnect');

// Controlador para manejar la búsqueda de películas
// Realiza una consulta a la base de datos y responde con el listado de películas
const busquedaControlador = async (req, res) => {
    try {
        // Consulta SQL para obtener todas las películas
        const query = 'SELECT * FROM peliculas';
        // Ejecuta la consulta y obtiene los resultados
        const { rows } = await pool.query(query);
        // Responde con las películas en formato JSON
        res.json({ peliculas: rows });
    } catch (error) {
        // Muestra el error en consola y responde con un error 500
        console.log(error);
        res.status(500).json({ error: 'Error al obtener las películas' });
    }
};

// Exporta el controlador para ser usado en las rutas
module.exports = { busquedaControlador };

