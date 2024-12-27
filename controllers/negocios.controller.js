const { response } = require('express'),
      bcrypt  = require('bcryptjs'),
      Negocio = require("../models/negocio.models"),
      { generarJWT } = require("../helpers/jwt");


const obtenerNegocios = async( req, res = response ) => {

    try {

        const negocio = await Negocio.find({}, 'nombre correo role google');
    
        res.json({
            ok: true,
            negocio,
            uid: req.uid, 
            role: req.role 
        })
    } catch(error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... consulte con un administrador'
        });
    }
}

const crearNegocios  = async( req, res = response ) => {

    const { celular, correo, password, } = req.body;

    try {

        const existeCorreo = await Negocio.findOne({ correo }),
              existeCelular = await Negocio.findOne({ celular });

        if ( existeCorreo || existeCelular ) {
            return res.status(400).json({
                ok: false,
                msg: 'Este Celular o Correo ya está registrado'
            });
        }

        const negocio = new Negocio( req.body );

        // Encriptar contraseña 
        const salt = bcrypt.genSaltSync();
        negocio.password = bcrypt.hashSync( password, salt );

        //Guardar 
        await negocio.save()

        // Generar el token
        const jwt = await generarJWT( negocio.id, negocio.role ); 

+
    res.json({
        ok: true,
        negocio,
        jwt
    })

    } catch(error){
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }

}

const eliminarNegocios = async( req, res = response ) => {

    const uid = req.params.id

    try {

        const NegocioBD = await Negocio.findById( uid );

        if (!NegocioBD) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un negocio por ese id'
            });
        }

        await Negocio.findByIdAndDelete(uid);

        res.json({
            ok: true,
            msg: 'Negocio eliminado'
        });

    } catch(error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }

}

const actualizarNegocios = async( req, res = response ) => {

    const uid = req.params.id

    try {

        const NegocioDB = await Negocio.findById( uid );

        if (!NegocioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un Negocio por ese id'
            });
        }

        //Atualizaciones
        const { password, google, role, correo, celular, ...campos} = req.body;
       
        if (NegocioDB.celular == celular && uid !== NegocioDB.uid){
            const existeEmail = await Negocio.findOne({ celular });
            if ( existeEmail ) {
                return res.status(400).json({
                    ok: false,
                    msg: 'No puedes ingresar el mismo celular que tienes registrado'
                });
            }
        }

        if ( NegocioDB.correo !== correo ) {

            const existeEmail = await Negocio.findOne({ correo });
            if ( existeEmail ) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un negocio con ese email'
                });
            }
        }

        if ( NegocioDB.celular !== celular ) {

            const existeCelular = await Negocio.findOne({ celular });
            if ( existeCelular ) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un usuario con ese celular'
                });
            }
        }
        
                              //todo: si new no esta en true, nos muestra el registro anterior primero
        const negocioActualizado = await Negocio.findByIdAndUpdate( uid, {campos, correo, celular}, { new: true });
        res.json({
            ok: true,
            negocio: negocioActualizado
        })


    }catch(error){
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }


}

module.exports = {
    obtenerNegocios,
    crearNegocios,
    eliminarNegocios,
    actualizarNegocios
}