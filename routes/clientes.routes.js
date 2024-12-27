//TODO Ruta: /api/clientes,
 const { Router } = require('express'),
        { check } = require('express-validator'),
        { validarCampos } = require('../middlewares/validar-campos'),
        { getClientes, crearClientes, 
        actualizarCliente, borrarCliente,
        crearClientesConImagen } = require('../controllers/clientes.controllers'),
        { validarJWT } = require('../middlewares/validar-jwt'),
        router = Router(),
        multer = require('multer');

const upload = multer({
    storage: multer.memoryStorage()
});

router.get('/', validarJWT, getClientes );

router.post('/', 
    [   
        
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'La contraseña es obligatorio').not().isEmpty(),
        check('correo', 'El correo es obligatorio').isEmail(),
        check('celular', 'El celular es obligatorio').isNumeric(),
        validarCampos
    ],
    crearClientes 
);

router.put( '/:id', 
    [
        validarJWT,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('correo', 'El correo es obligatorio').isEmail(),
        check('celular', 'El celular es obligatorio').isNumeric(),
        validarCampos,
    ],
     actualizarCliente
);

router.delete( '/:id', 
     validarJWT,
     borrarCliente
);

// (upload) => {router,
//     router.post('/crearConImagen', 
//     upload.array('image', 1),
//         [   
            
//             check('nombre', 'El nombre es obligatorio').not().isEmpty(),
//             check('password', 'La contraseña es obligatorio').not().isEmpty(),
//             check('correo', 'El correo es obligatorio').isEmail(),
//             check('celular', 'El celular es obligatorio').isNumeric(),
//             validarCampos
//         ],
//         crearClientesConImagen
//     );
// };

router.post('/crearConImagen', 
    upload.array('image', 1),  // Asegúrate que el cliente envía el archivo en un campo llamado 'image'
    [   
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'La contraseña es obligatorio').not().isEmpty(),
        check('correo', 'El correo es obligatorio').isEmail(),
        check('celular', 'El celular es obligatorio').isNumeric(),
        validarCampos
    ],
    crearClientesConImagen
);




module.exports = router;