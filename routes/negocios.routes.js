//TODO Ruta: /api/negocios

const { Router } = require('express'),
        { check } = require('express-validator'),
        { validarCampos } = require('../middlewares/validar-campos'),
        { obtenerNegocios, crearNegocios, actualizarNegocios, eliminarNegocios } = require('../controllers/negocios.controller'),
        { validarJWT } = require('../middlewares/validar-jwt'),
        router = Router();


router.get('/', validarJWT, obtenerNegocios );

router.post('/' , 
[   

check('nombre', 'El nombre es obligatorio').not().isEmpty(),
check('password', 'La contraseña es obligatorio').not().isEmpty(),
check('correo', 'El correo es obligatorio').isEmail(),
check('celular', 'El celular es obligatorio').isNumeric(),
check('nit', 'El nit es obligatorio').not().isEmpty(),
check('direccion', 'El nit es obligatorio').not().isEmpty(),
check('administrador', 'Los datos del administrador son requeridos').not().isEmpty(),
validarCampos
],
crearNegocios 
);

router.put( '/:id',  
[
// validarJWT,
check('nombre', 'El nombre es obligatorio').not().isEmpty(),
check('correo', 'El correo es obligatorio').isEmail(),
check('celular', 'El celular es obligatorio').isNumeric(),
validarCampos,
],
actualizarNegocios
);

router.delete( '/:id', 
eliminarNegocios
);



module.exports = router;