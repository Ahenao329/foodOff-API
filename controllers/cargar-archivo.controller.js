const { response } = require('express'),
      path = require('path'),
      fs = require('fs'),
      { actualizarImagen } = require('../helpers/actualizar-foto'),
      { v4: uuidv4 } = require('uuid');

const subirArchivo = ( req, res = response ) => {

    const tipo = req.params.tipo;
    const id = req.params.id

    //validar tipo
    const tiposValidos = ['clientes','negocios','internos', 'externos'];
    if ( !tiposValidos.includes(tipo) ){
        return res.status(400).json({
            ok: false,
            msg: 'No es un cliente, negocio o repartidor'
        });
    }

    //validar que exisra el archivo
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No hay ningún archivo'
        });
    }

    // Procesar la imagen...
    const file = req.files.foto;

    const nombreCortado = file.name.split('.');
    const extensionArchivo = nombreCortado[ nombreCortado.length - 1 ];

    // Validar extension
    const extensionesValidas = ['png','jpg','jpeg','gif'];
    if ( !extensionesValidas.includes( extensionArchivo ) ) {
        return res.status(400).json({
            ok: false,
            msg: 'No es una extensión permitida'
        });
    }

    //Generar el nombre del archivo
    const nombreArchivo = `${ uuidv4() }.${ extensionArchivo }`;

    // Path para guardar la imagen
    const path = `./uploads/${ tipo }/${ nombreArchivo }`;


    //todo  no deberiamos de hacer la carga de archivos en el servidor, ya que si alguien ingresa
    //todo  un archivo malicioso no lo podremos detectar, dejar esto en manos de terceros como cloudinary
    //todo  o crearnos un backend independiente solo para el ingreso de archivos, o en este caso que las
    //todo  imagenes no las crea un solo usuario, enviarla directamente a la bd con el parametro del role
    //todo  consultar bien que seria mejor en estos casos 

    // Mover la imagen
    file.mv( path , (err) => {
        if (err){
            console.log(err)
            return res.status(500).json({
                ok: false,
                msg: 'Error al mover la imagen'
            });
        }

        // Actualizar base de datos
        actualizarImagen( tipo, id, nombreArchivo );

        res.json({
            ok: true,
            msg: 'Archivo subido',
            nombreArchivo
        });
    });

}

const leerImagen = ( req, res = response ) => {

    const tipo = req.params.tipo;
    const foto = req.params.foto;

    const pathImg = path.join( __dirname, `../uploads/${ tipo }/${ foto }` );

    // imagen por defecto
    if ( fs.existsSync( pathImg ) ) {
        res.sendFile( pathImg );
    } else {
        const pathImg = path.join( __dirname, `../uploads/no-img.png` );
        res.sendFile( pathImg );
    }

}
module.exports = {
    subirArchivo,
    leerImagen
}