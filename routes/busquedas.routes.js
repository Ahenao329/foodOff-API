//todo: ruta: api/todo/:busqueda
const { Router } = require('express'),
      { busquedaTotal, getDocumentosColleccion } = require('../controllers/busquedas.controller'),
      { validarJWT } = require('../middlewares/validar-jwt');

router = Router();

router.get('/:busqueda', validarJWT,  busquedaTotal );

router.get('/:coleccion/:tabla/:busqueda', validarJWT,  getDocumentosColleccion );










module.exports = router;