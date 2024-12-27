//todo: ruta: /api/subir-archivo/

const { Router } = require('express'),
      { validarJWT } = require('../middlewares/validar-jwt'),
      { subirArchivo, leerImagen } = require('../controllers/cargar-archivo.controller'),
      FileUpload = require('express-fileupload');

router = Router();

router.use( FileUpload() );

router.put('/:tipo/:id', validarJWT, subirArchivo );

router.get('/:tipo/:foto', validarJWT, leerImagen );





module.exports = router



