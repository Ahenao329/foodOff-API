const { response } = require('express'),
      Administrador = require('../models/administrador.models'),
      bcrypt  = require('bcryptjs'),
      { generarJWT } = require("../helpers/jwt");


const obtenerAdministrador = async( req, res = response ) => {

    try {
 
        const administrador = await Administrador.find({}, 'nombre correo role google');
    
        res.json({
            ok: true,
            administrador,
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

const crearAdministrador = async( req, res = response ) => {

    const uid = req.uid;
    const administrador = new Administrador({
        administrador: uid,
        ...req.body
    })


    const { celular, correo, password, } = req.body;


    try {

        const existeCorreo = await Administrador.findOne({ correo }),
        existeCelular = await Administrador.findOne({ celular });

        if ( existeCorreo || existeCelular ) {
            return res.status(400).json({
                ok: false,
                msg: 'Este Celular o Correo ya está registrado'
            });
        }
        
        // const administrador = new Administrador( req.body );

        // Encriptar  
        const salt = bcrypt.genSaltSync();
        administrador.password = bcrypt.hashSync( password, salt );

        //Guardar 
        await administrador.save()

        // Generar el token
        const jwt = await generarJWT( administrador.id, administrador.role ); 


        res.json({
            ok: true,
            administrador,
            jwt
        });
        
    } catch(error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... consulte con un administrador'
        });
    }

}


const actualizarAdministrador = async( req, res = response ) => {
    
    const uid = req.params.id

    try {
     
        const adminDB = await Administrador.findById( uid );

        if (!adminDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un administrador por ese id'
            });
        }

        //Atualizaciones
        const { password, role, correo, celular, ...campos} = req.body;
       
        if (adminDB.celular == celular && uid !== adminDB.uid){
            const existeEmail = await Administrador.findOne({ celular });
            if ( existeEmail ) {
                return res.status(400).json({
                    ok: false,
                    msg: 'No puedes ingresar el mismo celular que tienes registrado'
                });
            }
        }

        if ( adminDB.correo !== correo ) {

            const existeEmail = await Administrador.findOne({ correo });
            if ( existeEmail ) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un usuario con ese email'
                });
            }
        }

        if ( adminDB.celular !== celular ) {
  
              const existeCelular = await Administrador.findOne({ celular });
              if ( existeCelular ) {
                  return res.status(400).json({
                      ok: false,
                      msg: 'Ya existe un usuario con ese celular'
                  });
              }
        }
        
        const adminActualizado = await Administrador.findByIdAndUpdate( uid, {campos, correo, celular}, { new: true });
        res.json({
            ok: true,
            administrador: adminActualizado
        });

    } catch(error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }
}



const borrarCliente = async( req, res = response ) => {

    const uid = req.params.id

    try {

        const adminDB = await Administrador.findById( uid );

        if (!adminDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un administrador por ese id'
            });
        }

        await Administrador.findByIdAndDelete(uid);

        res.json({
            ok: true,
            msg: 'Administrador eliminado'
        });

    } catch(error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }

}


module.exports = {
    obtenerAdministrador,
    crearAdministrador,
    actualizarAdministrador,
    borrarCliente
}