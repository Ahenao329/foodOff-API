const { response } = require('express'),
      bcrypt  = require('bcryptjs'),
      Cliente = require("../models/cliente.models"),
      { generarJWT } = require("../helpers/jwt"),
      storage = require = require("../utils/cloud_storage");

      
const obtenerPermisos = async(req) => {

    const { role } = req.body;
    console.log(role, '🅿️🅿️');
    esCliente = (role === 'CLIENTE_ROLE')? esCliente = true
                                         : esCliente = false
                                         

}

const getClientes = async( req, res ) => {

    const desde = Number(req.query.desde) || 0;

    try{


        if (  req.role === 'CLIENTE_ROLE' ){
            // const clientes = await Cliente.find({}, 'nombre correo role google')    
            //                             .skip( desde )
            //                             .limit( 5 );
    
            // const total = await Cliente.count();

            const [ clientes, total ] = await Promise.all([
                Cliente
                .find({}, 'nombre correo role google')    
                .skip( desde )
                .limit( 5 ),

                Cliente.count(),
            ]);

            res.json({
                ok: true,
                clientes,
                total,
                uid: req.uid, //todo este es el usuario que hace la peticion
                role: req.role
            });

        } else{
           return res.status(500).json({
                ok: false,
                msg: 'no tienes permiso'
            });
        }

    } catch(error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... consulte con un administrador'
        });
    }

    // en el metodo find podemos hacer filtros, validaciones, paginaciones.. solo buscar documentacion
    // const clientes = await Cliente.find();


}

const crearClientes = async(req, res = response) => {

    const { celular, correo, password, } = req.body;

    try {

        const existeCorreo = await Cliente.findOne({ correo }),
              existeCelular = await Cliente.findOne({ celular });

        if ( existeCorreo || existeCelular ) {
            return res.status(400).json({
                ok: false,
                msg: 'Este Celular o Correo ya está registrado'
            });
        }

        const cliente = new Cliente( req.body );

        // Encriptar contraseña 
        const salt = bcrypt.genSaltSync();
        cliente.password = bcrypt.hashSync( password, salt );

        //Guardar cliente
        await cliente.save()

        // Generar el Tojen
        const jwt = await generarJWT( cliente.id, cliente.role ); 

+
    res.json({
        ok: true,
        cliente,
        jwt
    });

    } catch(error){
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }

}
const crearClientesConImagen = async (req, res = response) => {
    const clienteData = JSON.parse(req.body.cliente);
    console.log('📋 Cliente data recibida:', clienteData);

    const { celular, correo, password } = clienteData;
    const files = req.files;
    console.log('📂 Archivos recibidos:', files);

    try {
        if (files && files.length > 0) {
            console.log('📤 Procesando imagen...');
            const path = `image_${Date.now()}`;
            const url = await storage(files[0], path);

            if (url) {
                console.log('✔️ Imagen subida con éxito:', url);
                clienteData.foto = url;
            } else {
                console.log('❌ Error al subir la imagen.');
            }
        } else {
            console.log('❌ No se recibió ninguna imagen.');
        }

        const existeCorreo = await Cliente.findOne({ correo });
        const existeCelular = await Cliente.findOne({ celular });

        if (existeCorreo || existeCelular) {
            return res.status(400).json({
                ok: false,
                msg: 'Este celular o correo ya está registrado'
            });
        }

        const cliente = new Cliente(clienteData);
        const salt = bcrypt.genSaltSync();
        cliente.password = bcrypt.hashSync(password, salt);
        await cliente.save();

        const jwt = await generarJWT(cliente.id, cliente.role);

        res.json({
            ok: true,
            cliente,
            jwt
        });
    } catch (error) {
        console.log('❌ Error inesperado:', error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }
};






const actualizarCliente = async(req, res = response) => {

    // TODO: Validar token y comprobar si es el usuario correcto

    const uid = req.params.id;

    try {

        const clienteDB = await Cliente.findById( uid );

        if (!clienteDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un cliente por ese id'
            });
        }

        //Atualizaciones
        const { password, google, role, correo, celular, ...campos} = req.body;
       
        if (clienteDB.celular == celular && uid !== clienteDB.uid){
            const existeEmail = await Cliente.findOne({ celular });
            if ( existeEmail ) {
                return res.status(400).json({
                    ok: false,
                    msg: 'No puedes ingresar el mismo celular que tienes registrado'
                });
            }
        }

        if ( clienteDB.correo !== correo ) {

            const existeEmail = await Cliente.findOne({ correo });
            if ( existeEmail ) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un usuario con ese correo'
                });
            }
        }

        if ( clienteDB.celular !== celular ) {

            const existeCelular = await Cliente.findOne({ celular });
            if ( existeCelular ) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un usuario con ese celular'
                });
            }
        }
        
                              //todo: si new no esta en true, nos muestra el registro anterior primero
        const clienteActualizado = await Cliente.findByIdAndUpdate( uid, {campos, correo, celular}, { new: true });
        res.json({
            ok: true,
            cliente: clienteActualizado
        });


    }catch(error){
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

        const clienteDB = await Cliente.findById( uid );

        if (!clienteDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un cliente por ese id'
            });
        }

        await Cliente.findByIdAndDelete(uid);

        res.json({
            ok: true,
            msg: 'Cliente eliminado'
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
    getClientes,
    crearClientes,
    actualizarCliente,
    borrarCliente,
    crearClientesConImagen
};