// REQUERIMIENTOS DE TERCEROS

// REQUERIMIENTOS PROPIOS

const comprobarNombrePelicula = (req, res, next) => {
    try {

        next();

    }catch (error){
        console.log(error);
        res.status(500).json({
            ok: false,
            mensaje: "Ha habido un problema, contacte con el administrador"
        });
    };
};

module.exports = {comprobarNombrePelicula};


