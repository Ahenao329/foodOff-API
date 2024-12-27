const express = require('express');
require('dotenv').config();
const logger = require('morgan');
const cors = require('cors');
const { dbConnection } = require('./database/config');
// const multer = require('multer');

// Crear el servidor de express
const app = express();

const port = process.env.PORT || 3000; //no es necesario

// Configurar CORS
app.use(logger('dev'));//Todo investigar
app.use( cors() );
app.disable('x-powered-by'); //TODO: investigar a fondo
app.set('port', port);

// const upload = multer({
//     storage: multer.memoryStorage()
// });

// Lectura y parseo del body
app.use( express.json() );
app.use(express.urlencoded({ //TODO: tambien se debe investigar
    extended: true
}));



// Base de datos
dbConnection();

//Rutas
app.use( '/api/clientes', require('./routes/clientes.routes'), );
app.use( '/api/login', require('./routes/iniciar-sesion.routes') );
app.use( '/api/negocios', require('./routes/negocios.routes') );
app.use( '/api/repartidores-internos', require('./routes/repartidores-internos.routes') );
app.use( '/api/repartidores-externos', require('./routes/repartidores-externos.routes') );
app.use( '/api/administradores', require('./routes/administradores.routes') );
app.use( '/api/todo', require('./routes/busquedas.routes') );
app.use( '/api/subir-archivo', require('./routes/cargar-archivos.routes') );


app.listen(3000 || '192.168.157.1' || 'localhost', () => {
    console.log('Servidor corriendo por el puerto ' + process.env.PORT);
});

// ERROR HANDLER
app.use((err, res,) => {
    console.log(err);
    res.status(err.status || 500).send(err.stack);
});