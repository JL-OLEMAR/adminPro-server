/*
  Ruta: /api/usuarios
*/
const { Router } = require('express')
const { check } = require('express-validator')

const { validarCampos } = require('../middlewares/validar-campos.js')
const { validarJWT, validarADMINROLE, validarSameUser } = require('../middlewares/validar-jwt.js')
const { newUser, getUsers, actualizarUsuario, borrarUsuario } = require('../controllers/usuarios.js')

const router = Router()

router.get('/', validarJWT, getUsers)

router.post('/',
  [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    validarCampos
  ],
  newUser
)

// Check if the user is an admin
router.put('/:id',
  [
    validarJWT,
    validarSameUser,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('role', 'El role es obligatorio').not().isEmpty(),
    validarCampos
  ],
  actualizarUsuario)

// Check if the user is an admin
router.delete('/:id', [validarJWT, validarADMINROLE], borrarUsuario)

module.exports = router
