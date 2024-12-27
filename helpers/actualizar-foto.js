const Cliente = require('../models/cliente.models'),
      Negocio = require('../models/negocio.models'),
      Interno = require('../models/repartidor-internos.models'),
      Externo = require('../models/repartidor-externo.models'),
      fs = require('fs');


const borrarImagen =  ( path ) => {
    if ( fs.existsSync( path ) ){
        fs.unlinkSync( path );
    }

}
      

const actualizarImagen = async( tipo, id,  nombreArchivo ) => {


    switch( tipo ) {
        case 'clientes':
            const cliente = await Cliente.findById(id)
            if (!cliente){
                console.log('No es clientes por id')
                return false;
            }

            pathviejo = `./uploads/clientes/${ cliente.foto }`;
            // if ( fs.existsSync( pathviejo ) ){
            //     fs.unlinkSync( pathviejo );
            // }
            borrarImagen( pathviejo );

            cliente.foto = nombreArchivo
            await cliente.save();
            return true;

        break;

        case 'negocios':

            const negocio = await Negocio.findById(id)
            if (!negocio){
                console.log('No existen negocios por id')
                return false;
            }

            pathviejo = `./uploads/negocios/${ negocio.foto }`;
            borrarImagen( pathviejo );

            negocio.foto = nombreArchivo
            await negocio.save();
            return true;
        

        break;

        case 'internos':
            const interno = await Interno.findById(id)
            if (!interno){
                console.log('No existen internos por id')
                return false;
            }

            pathviejo = `./uploads/internos/${ interno.foto }`;
            borrarImagen( pathviejo );

            interno.foto = nombreArchivo
            await interno.save();
            return true;
        break;

        case 'externos':
            const externo = await Externo.findById(id)
            if (!externo){
                console.log('No existen externos por id')
                return false;
            }

            pathviejo = `./uploads/externos/${ externo.foto }`;
            borrarImagen( pathviejo );

            externo.foto = nombreArchivo
            await externo.save();
            return true;
        break;

    }

}



module.exports = {
    actualizarImagen
}