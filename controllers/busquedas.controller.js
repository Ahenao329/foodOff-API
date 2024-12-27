const{ response } = require('express'),
        Cliente = require('../models/cliente.models'),
        Negocio = require('../models/negocio.models'),
        Interno = require('../models/repartidor-internos.models'),
        Externo = require('../models/repartidor-externo.models');

const busquedaTotal = async( req, res= response ) => {

    const busqueda = req.params.busqueda;
    const regex = new RegExp( busqueda, 'i' );

    
    try{
        
        // const clientes = await Cliente.find({ nombre: regex });
        // const negocio = await Negocio.find({ nombre: regex });
        // const interno = await Interno.find({ nombre: regex });
        // const externo = await Externo.find({ nombre: regex });
    
        const [ clientes ,negocio ,interno ,externo ] = await Promise.all([
            Cliente.find({ nombre: regex }),
            Negocio.find({ nombre: regex }),
            Interno.find({ nombre: regex }),
            Externo.find({ nombre: regex }),             
        ]);

        res.json({
            ok: true,
            clientes,
            negocio,
            interno,
            externo,
        });

    }catch(error){
        return console.log(error);
        res.json({
            ok: false
        });
    }

}


const getDocumentosColleccion = async( req, res= response ) => {

    const tabla = req.params.tabla;
    const busqueda = req.params.busqueda;
    const regex = new RegExp( busqueda, 'i' );

    let data = [];

        switch ( tabla ) {
            case 'clientes':
                data = await Cliente.find({ nombre: regex })
                break;           
            case 'negocios':
                data = await Negocio.find({ nombre: regex });
                break;          
            case 'internos':
                data = await Interno.find({ nombre: regex })
                                .populate('administrador', 'nombre, correo');
                break;   
            case 'externos':
                data = await Externo.find({ nombre: regex });
                break;                   
            default:
                return res.status(400).json({
                    ok: false,
                    msg: ('La rtabla tiene que ser clientes/negocios/internos/externos')
                });
        }

        res.json({
            ok:true,
            resultados: data
        });


}

module.exports = {
    busquedaTotal,
    getDocumentosColleccion
}

