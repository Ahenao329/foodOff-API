
const { Schema, model } = require('mongoose');

const RepartidorInternoSchema = Schema({
    nombre: {
        type: String,
        required: true
    },        
    celular: {
        type: Number,
        required: true,
        unique: true
    },
    cedula: {
        type: Number,
        required: true,
        unique: true
    },
    licencia: {
        type: String,
        required: true,
        unique: true
    },
    correo: {
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
        default: 'INTERNO_ROLE'
    },
    google: {
        type: Boolean,
        default: false
    },
    genero: {
        type: Boolean,
        default: false
    },
    tarjeta: {
        // tipo: ["credito", "debito", ],
        numero: {
            type: String,
            default: '0000 0000 0000',
            required: true,
        },
        cvv: {
            type: String,
            default: '0000',
            required: true,

        },
        ma: {
            type: String,
            default: 'MM/AA',
            required: true,
        }
    },
    contacto: {
        nombre: {
            type: String,
            required: true,
        },
        cedula: {
            type: Number,
            required: true,

        },
        celular: {
            type: Number,
            required: true,
        },
        correo: {
            type: String,
            required: true,
        },
        direccion: {
            type: String,
        },
    },
    terminos: {
        type: Boolean,
        required: true,
        default: false
    },
    administrador: { //asi vemos quien fue el administrador que creo este repartidor
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Administrador'
    },
    
}, { collection: 'RepartidoresInternos' });

//con este metodo estraemos el _id por si no lo queremos asi, es de mongoose
RepartidorInternoSchema.method('toJSON', function() { 
    const {__v, password, ...Object} =  this.toObject();
    return Object;
})

module.exports = model( 'RepartidorInterno', RepartidorInternoSchema );
