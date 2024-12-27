//TODO Ruta: /api/administradores


const { Router } = require('express'),
        { check } = require('express-validator'),
        { validarCampos } = require('../middlewares/validar-campos'),
        { obtenerAdministrador, crearAdministrador, actualizarAdministrador, borrarCliente } = require('../controllers/administradores.controller'),
        { validarJWT } = require('../middlewares/validar-jwt'),
        router = Router();


router.get('/', validarJWT, obtenerAdministrador );

router.post('/' , 
[   

check('nombre', 'El nombre es obligatorio').not().isEmpty(),
check('password', 'La contraseña es obligatorio').not().isEmpty(),
check('correo', 'El correo es obligatorio').isEmail(),
check('celular', 'El celular es obligatorio').isNumeric(),
check('cedula', 'La cedula es obligatoria').not().isEmpty(),
check('direccion', 'La direccion es obligatorio').not().isEmpty(),
// check('usuario', 'Los datos del administrador son requeridos').not().isEmpty(),
validarCampos
],
crearAdministrador 
);

router.put( '/:id',  
[
// validarJWT,
check('nombre', 'El nombre es obligatorio').not().isEmpty(),
check('password', 'La contraseña es obligatorio').not().isEmpty(),
check('correo', 'El correo es obligatorio').isEmail(),
check('celular', 'El celular es obligatorio').isNumeric(),
check('cedula', 'La cedula es obligatoria').not().isEmpty(),
check('direccion', 'La direccion es obligatorio').not().isEmpty(),
validarCampos,
],
actualizarAdministrador
);

router.delete( '/:id', validarJWT, 
borrarCliente
);



module.exports = router;