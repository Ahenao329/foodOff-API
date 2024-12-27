//TODO Ruta: /api/login

const { Router } = require('express');
const { login, loginNegocios, loginAdministradores, loginInternos, loginExternos, } = require('../controllers/iniciar-sesion.controller');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();


router.post( '/cliente',
    [ 
        check('correo', 'El correo es obligatorio'),
        check('password', 'El password es obligatorio'),
        validarCampos
    ],
    login
)

router.post( '/negocio',
    [ 
        check('correo', 'El correo es obligatorio'),
        check('password', 'El password es obligatorio'),
        validarCampos
    ],
    loginNegocios
)

router.post( '/administrador',
    [ 
        check('correo', 'El correo es obligatorio'),
        check('password', 'El password es obligatorio'),
        validarCampos
    ],
    loginAdministradores
)

router.post( '/interno',
    [ 
        check('correo', 'El correo es obligatorio'),
        check('password', 'El password es obligatorio'),
        validarCampos
    ],
    loginInternos
)

router.post( '/externo',
    [ 
        check('correo', 'El correo es obligatorio'),
        check('password', 'El password es obligatorio'),
        validarCampos
    ],
    loginExternos
)
module.exports = router;