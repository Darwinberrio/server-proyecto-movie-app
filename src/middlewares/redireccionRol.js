const jwt = require("jsonwebtoken");

const redireccionRol = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader) return next();

    const token = authHeader.split(" ")[1];
    if (!token) return next();

    try {
        const { rol } = jwt.verify(token, process.env.JWT_SECRET_KEY);
        if (rol === "admin") return res.redirect("/movies");
        if (rol === "user") return res.redirect("/dashboard");
        next();
    } catch (err) {
        next();
    }
};

module.exports = { redireccionRol };
