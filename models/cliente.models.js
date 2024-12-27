
const { Schema, model } = require('mongoose');

const ClienteSchema = Schema({
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
        default: 'CLIENTE_ROLE'
    },
    google: {
        type: Boolean,
        default: false
    },
    tarjeta: {
        //todo buscar forma de que solo se permita debito o credito, si no solo dato string
        tipo: ["credito" || "debito"],
        numero: {
            type: String,
        },
        cvv: {
            type: String,
        },
        ma: {
            type: String,
        },
    },
    
});

//con este metodo estraemos el _id por si no lo queremos asi, es de mongoose
ClienteSchema.method('toJSON', function() { 
    const {__v, _id, password, ...Object} =  this.toObject();
    Object.uid = _id
    return Object;
})

module.exports = model( 'Cliente', ClienteSchema );
