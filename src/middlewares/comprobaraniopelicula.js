// REQUERIMIENTOS DE TERCEROS

// REQUERIMIENTOS PROPIOS

const comprobarAnioPelicula = (req, res, next) => {
       try {
        // Capturar los e

        next();

    }catch (error){
        console.log(error);
        res.status(500).json({
            ok: false,
            mensaje: "Ha habido un problema, contacte con el administrador"
        });
    };
};

module.exports = {comprobarAnioPelicula};


