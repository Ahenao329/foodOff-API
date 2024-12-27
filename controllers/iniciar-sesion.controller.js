const { response } = require('express'),
  bcrypt  = require('bcryptjs'),
  Cliente = require("../models/cliente.models"),
  Negocio = require("../models/negocio.models"),
  Administrador = require("../models/administrador.models"),
  Internos = require("../models/repartidor-internos.models"),
  Externos = require("../models/repartidor-externo.models"),
 { generarJWT } = require('../helpers/jwt');



 //todo: dependiendo de el path en el que inicie sesion se sabra si llamar el iniciar sesion de negocio, cliente o quien sea

//  const logins = async( req, res = response) => {

//     const { correo, password, role } = req.body;


//      switch( role ) {
//      case 'CLIENTE_ROLE':
//          console.log('Domingo');
//          break;
//      case 'NEGOCIO_ROLE':
//          console.log('Lunes');
//          break;
//      default: 
//          console.log('No es lunes, maretes o domingo');
//  }
//  }


const login = async( req, res = response) => {

    const { correo, password, } = req.body;

    try{

        // Verificar correo
        const clienteDB = await Cliente.findOne({ correo });

        if ( !clienteDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'Correo no encontrado'
            })
        }

        // Verificar contraseña
        const validarPassword = bcrypt.compareSync( password, clienteDB.password );
        if ( !validarPassword ) {
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña no valida'
            })
        }

        //Generar el Token - JWT
        const token = await generarJWT( clienteDB.id, clienteDB.role ); 

        const data = {
            id: clienteDB._id,
            nombre: clienteDB.nombre,
            celular: clienteDB.celular,
            correo: clienteDB.correo,
            foto: clienteDB.foto,
            role: clienteDB.role,
            google: clienteDB.google,
            tarjeta: clienteDB.tarjeta,
            sessionToken: `JWT ${token}`
        }

        res.json({
            ok: true,
            token,
            data
        });

    }catch(error){
        console.log(error);
        res.status(400),json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}

const loginNegocios = async( req, res = response) => {

    const { correo, password } = req.body;

    try{

        // Verificar correo
        const NegocioDB = await Negocio.findOne({ correo });

        if ( !NegocioDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'Correo no encontrado'
            })
        }

        // Verificar contraseña
        const validarPassword = bcrypt.compareSync( password, NegocioDB.password );
        if ( !validarPassword ) {
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña no valida'
            })
        }

        //Generar el Token - JWT
        const token = await generarJWT( NegocioDB.id, NegocioDB.role ); 

        res.json({
            ok: true,
            token
        });

    }catch(error){
        console.log(error);
        res.status(400),json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}

const loginAdministradores = async( req, res = response) => {

    const { correo, password } = req.body;

    try{

        // Verificar correo
        const AdministradorDB = await Administrador.findOne({ correo });

        if ( !AdministradorDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'Correo no encontrado'
            })
        }

        // Verificar contraseña
        const validarPassword = bcrypt.compareSync( password, AdministradorDB.password );
        if ( !validarPassword ) {
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña no valida'
            })
        }

        //Generar el Token - JWT
        const token = await generarJWT( AdministradorDB.id, AdministradorDB.role ); 

        res.json({
            ok: true,
            token
        });

    }catch(error){
        console.log(error);
        res.status(400),json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}

const loginInternos = async( req, res = response) => {

    const { correo, password } = req.body;

    try{

        // Verificar correo
        const internosDB = await Internos.findOne({ correo });

        if ( !internosDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'Correo no encontrado'
            })
        }

        // Verificar contraseña
        const validarPassword = bcrypt.compareSync( password, internosDB.password );
        if ( !validarPassword ) {
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña no valida'
            })
        }

        //Generar el Token - JWT
        const token = await generarJWT( internosDB.id, internosDB.role ); 

        res.json({
            ok: true,
            token
        });

    }catch(error){
        console.log(error);
        res.status(400),json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}

const loginExternos = async(req, res = response) => {

    const { correo, password } = req.body;

    try{

        // Verificar correo
        const externosDB = await Externos.findOne({ correo });

        if ( !externosDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'Correo no encontrado'
            })
        }

        // Verificar contraseña
        const validarPassword = bcrypt.compareSync( password, externosDB.password );
        if ( !validarPassword ) {
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña no valida'
            })
        }

        //Generar el Token - JWT
        const token = await generarJWT( externosDB.id, externosDB.role ); 

        res.json({
            ok: true,
            token
        });

    }catch(error){
        console.log(error);
        res.status(400),json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}


module.exports = {
    login,
    loginNegocios,
    loginAdministradores,
    loginInternos,
    loginExternos,
}