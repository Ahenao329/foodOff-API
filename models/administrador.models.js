
const { Schema, model } = require('mongoose');

const AdministradorSchema = Schema({
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
        default: 'ADMIN_ROLE'
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Administrador'
    },
    terminos: {
        type: Boolean,
        default: false,
        required: true,
    },
    
}, { collection: 'Administradores' } );

//con este metodo estraemos el _id por si no lo queremos asi, es de mongoose
AdministradorSchema.method('toJSON', function() { 
    const {__v, password, ...Object} =  this.toObject();
    return Object;
})

module.exports = model( 'Administrador', AdministradorSchema );
