const { response } = require('express'),
      Interno = require('../models/repartidor-internos.models'),
      bcrypt  = require('bcryptjs'),
      { generarJWT } = require("../helpers/jwt");


const obtenerInternos = async( req, res = response ) => {

    try {
        
        const interno = await Interno.find({}, 'nombre correo role google')
                                    .populate('administrador', 'nombre, correo')

    
        res.json({
            ok: true,
            interno,
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

const crearInternos = async( req, res = response ) => {
            
    const uid = req.uid;    
    const { celular, correo, password, } = req.body;

    try {

        if (  req.role === 'ADMIN_ROLE' ) {
        const existeCorreo = await Interno.findOne({ correo }),
            existeCelular = await Interno.findOne({ celular });

            if ( existeCorreo || existeCelular ) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Este Celular o Correo ya está registrado'
            });
        }

        
        const interno = new Interno({ 
            administrador: uid,
            ...req.body 
        });


        // Encriptar 
        const salt = bcrypt.genSaltSync();
        interno.password = bcrypt.hashSync( password, salt );

        await interno.save();
        
        const jwt = await generarJWT( interno.id, interno.role ); 

        res.json({
            ok: true,
            interno,
            jwt
        });
    } else{
        return res.status(500).json({
             ok: false,
             msg: 'no tienes permiso'
         });
     }

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
    


}

const actualizarInternos = async( req, res = response ) => {

    const uid = req.params.id;

    try {
     
        const internoDB = await Interno.findById(uid);

        if (! internoDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un repartidor por ese id'
            });
        }

        const { password, google, role, correo, celular, ...campos} = req.body;

        if (internoDB.celular == celular && uid !== internoDB.uid){
            const existeEmail = await Interno.findOne({ celular });
            if ( existeEmail ) {
                return res.status(400).json({
                    ok: false,
                    msg: 'No puedes ingresar el mismo celular que tienes registrado'
                });
            }
        }

        
        if ( internoDB.correo !== correo ) {

            const existeEmail = await Interno.findOne({ correo });
            if ( existeEmail ) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un repartidor con ese correo'
                });
            }
        }
        
        if ( internoDB.celular !== celular ) {

            const existeCelular = await Interno.findOne({ celular });
            if ( existeCelular ) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un repartidor con ese celular'
                });
            }
        }

        const internoActualizado = await Interno.findByIdAndUpdate( uid, {campos, correo, celular}, { new: true });
        res.json({
            ok: true,
            interno: internoActualizado
        });

    } catch(error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... consulte con un administrador'
        });
    }
}

const borrarInternos = async( req, res = response ) => {

    const uid = req.params.id

    try {

        const internoDB = await Interno.findById( uid );

        if (!internoDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un repartidor por ese id'
            });
        }

        await Interno.findByIdAndDelete(uid);

        res.json({
            ok: true,
            msg: 'Repartidor eliminado'
        });

    } catch(error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado, consulta con un administrador'
        });
    }

}

module.exports = {
    obtenerInternos,
    crearInternos,
    actualizarInternos,
    borrarInternos
}