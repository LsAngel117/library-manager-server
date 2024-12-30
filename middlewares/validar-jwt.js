
const jwt = require('jsonwebtoken');

const validarJWT = (req, res, next) => {

    try {
        //Leer el token
        const token = req.header('x-token');
        // console.log(token);

        if (!token) {
            return res.status(401).json({
                ok: false,
                msg: 'No hay token en la petición'
            });
        }

        //Validar el token
        const { uid, name } = jwt.verify(token, process.env.SECRET_JWT_SEED);
        // console.log(uid, name);

        //Se agrega al request el uid y el name
        req.uid = uid;
        req.name = name;

        next();

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'token no válido'
        });
    }
}


module.exports = {
    validarJWT
}