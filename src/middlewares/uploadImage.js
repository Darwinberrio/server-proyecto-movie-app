
const fs = require("node:fs");

const saveImageMiddleware = (req, res,next) => {

    
    const body = req.body
    console.log("antes del nuevo path - body:", req.body);
    console.log("antes del nuevo path - file:", req.file);

    if (!req.file) {
      return next();
    }

    //captura el archivo subido
    const newPath = saveImage(req.file); 
    
    // Construimos la URL pública que quieres guardar (ajusta según tu static)
    const publicUrl = `/uploads/${req.file.originalname}`;

    // Guardamos la URL en el body para que el controller la use al guardar en la BD
    req.body.url_imagen = publicUrl;

    //console.log("nuevo path:", newPath);
    //console.log("url pública:", publicUrl);

    //pasa el control al siguiente middleware o controller
    next();

};

/**
 * funcion que guarda la ruta+nombre de imagen 
 * @param {*} file 
 * @returns 
 */
const saveImage=(file)=> {

    //construye el nuevo path a partir del originalname de file
    const newPath = `public/uploads/${file.originalname}`
    //renombra el atributo path del file con el nuevo path
    fs.renameSync(file.path, newPath)
    return newPath;
}

module.exports = {
    saveImageMiddleware
};
