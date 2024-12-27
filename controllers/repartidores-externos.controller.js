const { response } = require('express'),
      Externo = require('../models/repartidor-externo.models'),
      bcrypt  = require('bcryptjs'),
      { generarJWT } = require("../helpers/jwt");


const obtenerExternos = async( req, res = response ) => {

    try {
 
        const externo = await Externo.find({}, 'nombre correo role');
    
        res.json({
            ok: true,
            externo,
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

const crearExternos = async( req, res = response ) => {

    uid = req.uid;
    const { celular, correo, password } = req.body

    try {

        const existeCorreo = await Externo.findOne({ correo }),
            existeCelular = await Externo.findOne({ celular });

        if ( existeCorreo || existeCelular ) {
            return res.status(400).json({
                ok: false,
                msg: 'Este Celular o Correo ya está registrado'
            });
        }

        const externo = new Externo( req.body );

        const salt = bcrypt.genSaltSync();
        externo.password = bcrypt.hashSync( password, salt );

        console.log(externo, '❤️❤️');
        await externo.save();

        const jwt = await generarJWT( externo.id, externo.role );

        res.json({
            ok: true,
            externo,
            jwt
        })
    } catch(error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... consulte con un administrador'
        });
    }

}

const actualizarExternos = async( req, res = response ) => {

    const uid = req.params.id;

    try {

        const externoBD = await Externo.findById(uid);
     
        if (!externoBD) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un repartidor por ese id'
            });
        }

        const { password, google, role, correo, celular, ...campos} = req.body;
   
        if (externoBD.celular == celular && uid !== externoBD.uid){
            const existeEmail = await Externo.findOne({ celular });
            if ( existeEmail ) {
                return res.status(400).json({
                    ok: false,
                    msg: 'No puedes ingresar el mismo celular que tienes registrado'
                });
            }
        }

        if ( externoBD.correo !== correo ) {

            const existeEmail = await Externo.findOne({ correo });
            if ( existeEmail ) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un repartidor con ese correo'
                });
            }
        }

        
        if ( externoBD.celular !== celular ) {

            const existeCelular = await Externo.findOne({ celular });
            if ( existeCelular ) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un repartidor con ese celular'
                });
            }
        }
        const externoActualizado = await Externo.findByIdAndUpdate( uid, {campos, correo, celular}, { new: true });
        res.json({
            ok: true,
            externo: externoActualizado
        });

    } catch(error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... consulte con un administrador'
        });
    }
}

const eliminarExternos = async( req, res = response ) => {

    const uid = req.params.id;

    try {
        
        const externoBD = await Externo.findById(uid)


        if (!externoBD) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un repartidor por ese id'      
            });     
        }
        
        await Externo.findByIdAndDelete(uid);

        res.json({
            ok: true,
            msg: 'Repartidor eliminado'
        })
    } catch(error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... consulte con un administrador'
        });
    }
}


module.exports = {
    obtenerExternos,
    crearExternos,
    actualizarExternos,
    eliminarExternos
}