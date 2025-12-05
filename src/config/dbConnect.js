// IMPORTACIONES DE TERCEROS
const pg=require('pg')
const { Pool } = pg

// IMPORTACIONES PROPIAS
const connectionString = process.env.DB_URI

// CONEXIÓN A LA BASE DE DATOS
/**
 * Función que conecta con la base de datos
 */
const pool = new Pool({
  connectionString,
})

//PRUEBA
// const obtenerPeliculas=async()=>{
//     const result=await pool.query('SELECT * FROM peliculas');
//     console.log(result.rows);
// }

// obtenerPeliculas()

// EXPORTAR CONEXIÓN
module.exports={pool}