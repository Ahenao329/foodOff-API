//TODO Ruta: /api/repartidores-internos


const { Router } = require('express'),
        { check } = require('express-validator'),
        { validarCampos } = require('../middlewares/validar-campos'),
        { obtenerExternos, crearExternos, actualizarExternos, eliminarExternos } = require('../controllers/repartidores-externos.controller'),
        { validarJWT } = require('../middlewares/validar-jwt'),
        router = Router();


router.get('/', validarJWT, obtenerExternos );

router.post('/' ,  
[   
check('nombre', 'El nombre es obligatorio').not().isEmpty(),
check('password', 'La contraseña es obligatorio').not().isEmpty(),
check('correo', 'El correo es obligatorio').isEmail(),
check('celular', 'El celular es obligatorio').isNumeric(),
check('cedula', 'la cedula es requerida').not().isEmpty(),
check('direccion', 'El nit es obligatorio').not().isEmpty(),
check('tarjeta', 'La tarjeta es requerida').not().isEmpty(),
check('contacto', 'Los datos del contacto son obligatorios').not().isEmpty(),
check('terminos', 'Debes aceptar los terminos y condiciónes').not().isEmpty(),
check('fechaNacimiento', 'La fecha de nacimiento es obligatoria').not().isEmpty(),
check('placa', 'la placa de el vehiculo es obligatoria').not().isEmpty(),
check('placa', 'Placa debe ser en Mayuscula').toUpperCase().isUppercase(),
check('licencia', 'Los datos de la licencia de conducción son obligatorios').not().isEmpty(),
check('curriculum', 'La hoja de vida es obligatoria').not().isEmpty(),
// check('administrador', 'Los datos del administrador son requeridos').not().isEmpty(),
validarCampos
],
crearExternos 
);

router.put( '/:id',
[
validarJWT,
check('nombre', 'El nombre es obligatorio').not().isEmpty(),
check('password', 'La contraseña es obligatorio').not().isEmpty(),
check('correo', 'El correo es obligatorio').isEmail(),
check('celular', 'El celular es obligatorio').isNumeric(),
check('cedula', 'la cedula es requerida').not().isEmpty(),
check('direccion', 'El nit es obligatorio').not().isEmpty(),
check('tarjeta', 'La tarjeta es requerida').not().isEmpty(),
check('contacto', 'Los datos del contacto son obligatorios').not().isEmpty(),
check('terminos', 'Debes aceptar los terminos y condiciónes').not().isEmpty(),
check('fechaNacimiento', 'La fecha de nacimiento es obligatoria').not().isEmpty(),
check('placa', 'la placa de el vehiculo es obligatoria').not().isEmpty(),
check('placa', 'Placa debe ser en Mayuscula').toUpperCase().isUppercase(),
check('licencia', 'Los datos de la licencia de conducción son obligatorios').not().isEmpty(),
check('curriculum', 'La hoja de vida es obligatoria').not().isEmpty(),
validarCampos,
],
actualizarExternos
);

router.delete( '/:id', validarJWT,
eliminarExternos
);



module.exports = router;