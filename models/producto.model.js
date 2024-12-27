
const { Schema, model } = require('mongoose');

const ProductoSchema = Schema({
    nombre: {
        type: String,
        required: true
    },   
    descripcion: {
        type: String,
        required: true
    },        
    precio: {
        type: Number,
        required: true,
    },
    precioDescuento: {
        type: Number,
        required: true,
    },
    totalPrecioDescuento: {
        type: Number,
        required: true,
    },
    fechaCaducidad: {
        type: String,
        required: true,
    },
    foto: {
        type: String,
        required: true,
    },
    ingredientes: {
        type: String,
        required: true,
    },
    negocio: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Negocio'
    }
});

//con este metodo estraemos el _id por si no lo queremos asi, es de mongoose
ProductoSchema.method('toJSON', function() { 
    const {__v, ...Object} =  this.toObject();
    return Object;
})

module.exports = model( 'Producto', ProductoSchema );
