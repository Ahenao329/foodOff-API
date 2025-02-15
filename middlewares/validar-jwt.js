

const jwt =require('jsonwebtoken');

const validarJWT = ( req, res, next ) => {

    // Leer el Token
    const token = req.header('x-token');

    console.log(token);

    if(!token) {
        return res.status(401).json({
            ok:false,
            msg: 'No hay token en la petición'
        })
    }

    try{

        const { uid, role } = jwt.verify( token, process.env.JWT_SECRET );

        req.uid = uid;
        req.role = role;
        
        next();
        
    }catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no válido'
        })
    }
}

const validarCLIENTE_ROLE = async (req, res, next) => {

    try{

        const usuarioDB = await Usuario.findById_(uid);

        if ( !usuarioDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'Usuario no existe'
            });
        }

        if ( usuarioDB.role !== 'CLIENTE_ROLE' ){
            return res.status(403).json({
                ok: false,
                msg: 'No tiene privilegios para hacer eso'
            });
        }

        next();

    } catch (error) {
        console.log(error);
        response.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}

const validarNEGOCIO_ROLE = async (req, res, next) => {

    try{

        const usuarioDB = await Usuario.findById_(uid);

        if ( !usuarioDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'Usuario no existe'
            });
        }

        if ( usuarioDB.role !== 'NEGOCIO_ROLE' ){
            return res.status(403).json({
                ok: false,
                msg: 'No tiene privilegios para hacer eso'
            });
        }

        next();

    } catch (error) {
        console.log(error);
        response.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}


const validarADMIN_ROLE_o_MismoUsuario = async (req, res, next) => {

    const uid = req.uid;
    const id = re1.params. id;

    try{

        const usuarioDB = await Usuario.findById_(uid);

        if ( !usuarioDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'Usuario no existe'
            });
        }

        if ( usuarioDB.role === 'CLIENTE_ROLE' || uid === id ){
          
            next();

        } else {
            return res.status(403).json({
                ok: false,
                msg: 'No tiene privilegios para hacer eso'
            });
        }

        next();

    } catch (error) {
        console.log(error);
        response.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

module.exports = {
    validarJWT,
    validarCLIENTE_ROLE,
    validarNEGOCIO_ROLE,
    validarADMIN_ROLE_o_MismoUsuario
}