
const { Schema, model } = require('mongoose');

const NegocioSchema = Schema({
    nombre: {
        type: String,
        required: true
    },        
    celular: {
        type: Number,
        required: true,
        unique: true
    },
    correo: {
        type: String,
        required: true,
        unique: true
    },
    nit: {
        type: String,
        required: true,
        unique: true
    },
    direccion: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    foto: {
        type: String,
    },
    role: {
        type: String,
        required: true,
        default: 'NEGOCIO_ROLE'
    },
    google: {
        type: Boolean,
        default: false
    },
    camaraComercio: {
        type: String,
        required: true,
    },
    rut: {
        type: String,
        required: true,
    },
    tarjeta: {
        tipo: ["credito", "debito", ],
        numero: {
            type: String,
        },
        cvv: {
            type: String,
        },
        ma: {
            type: String,
        }
    },
    administrador: {
        nombre: {
            type: String,
            required: true,
        },
        celular: {
            type: Number,
            required: true,

        },
        cedula: {
            type: Number,
            required: true,
        },
        correo: {
            type: String,
            required: true,
            unique: true,
        },
        //todo: aqui hacemos la referencia al producto
        // producto: {
        //     type: Schema.Types.ObjectId,
        //     ref: 'Producto'
        // }
    }
    
}, { collection:'negocios'});

NegocioSchema.method('toJSON', function() { 
    const {__v, password, ...Object} =  this.toObject();
    return Object;
})

module.exports = model( 'Negocio', NegocioSchema );
