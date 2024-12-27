

const { Schema, model } = require('mongoose');

const RepartidorExternoSchema = Schema({
    nombre: {
        type: String,
        required: true
    },        
    celular: {
        type: Number,
        required: true,
        unique: true
    },
    fechaNacimiento: {
        type: String,
        required: true,
    },
    cedula: {
        type: Number,
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
    licencia: {
        type: String,
        required: true,
        unique: true
    },
    placa: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    foto: {
        type: String,
    },
    curriculum: {
        type: String,  
        required: true      
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
            unique: true,
            required: true,
        },
        direccion: {
            type: String,
            unique: true,
            required: true,
        },
    },
    terminos: {
        type: Boolean,
        required: true,
        default: false
    },
    
}, { collection: 'RepartidoresExternos' });

//con este metodo estraemos el _id por si no lo queremos asi, es de mongoose
RepartidorExternoSchema.method('toJSON', function() { 
    const {__v, password, ...Object} =  this.toObject();
    return Object;
})

module.exports = model( 'RepartidorExterno', RepartidorExternoSchema );
