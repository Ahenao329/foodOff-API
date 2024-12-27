//TODO Ruta: /api/repartidores-internos


const { Router } = require('express'),
        { check } = require('express-validator'),
        { validarCampos } = require('../middlewares/validar-campos'),
        { obtenerInternos, crearInternos, actualizarInternos, borrarInternos } = require('../controllers/repartidores-internos.controller'),
        { validarJWT } = require('../middlewares/validar-jwt'),
        router = Router();


router.get('/', validarJWT, obtenerInternos );

router.post('/' , validarJWT,
[   
check('nombre', 'El nombre es obligatorio').not().isEmpty(),
check('password', 'La contraseña es obligatorio').not().isEmpty(),
check('correo', 'El correo es obligatorio').isEmail(),
check('celular', 'El celular es obligatorio').isNumeric(),
check('cedula', 'la cedula es requerida').not().isEmpty(),
check('direccion', 'El nit es obligatorio').not().isEmpty(),
check('tarjeta', 'La tarjeta es requerida').not().isEmpty(),
check('contacto', 'Los datos del contacto son obligatorios').not().isEmpty(),
check('licencia', 'Los datos de la licencia de conducción son obligatorios').not().isEmpty(),
// check('administrador', 'Los datos del administrador son requeridos').not().isEmpty(),
// check('administrador', 'Administrador invaádo').isMongoId(),

validarCampos
],
crearInternos 
);

router.put( '/:id',  
[
// validarJWT,
check('nombre', 'El nombre es obligatorio').not().isEmpty(),
check('password', 'La contraseña es obligatorio').not().isEmpty(),
check('correo', 'El correo es obligatorio').isEmail(),
check('celular', 'El celular es obligatorio').isNumeric(),
check('cedula', 'la cedula es requerida').not().isEmpty(),
check('direccion', 'El nit es obligatorio').not().isEmpty(),
check('tarjeta', 'La tarjeta es requerida').not().isEmpty(),
check('contacto', 'Los datos del contacto son obligatorios').not().isEmpty(),
check('licencia', 'Los datos de la licencia de conducción son obligatorios').not().isEmpty(),
// validarCampos,
],
actualizarInternos
);

router.delete( '/:id', validarJWT,
borrarInternos
);



module.exports = router;