const pg=require('pg')
const { Pool } = pg
const connectionString = process.env.DB_URI

const pool = new Pool({
  connectionString,
})

//PRUEBA
// const obtenerPeliculas=async()=>{
//     const result=await pool.query('SELECT * FROM peliculas');
//     console.log(result.rows);
// }

// obtenerPeliculas()


module.exports={pool}