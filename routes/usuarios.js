/*
  Ruta: /api/usuarios
*/
const { Router } = require('express')
const { check } = require('express-validator')

const { validarCampos } = require('../middlewares/validar-campos.js')
const { validarJWT } = require('../middlewares/validar-jwt.js')
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

router.put('/:id',
  [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('role', 'El role es obligatorio').not().isEmpty(),
    validarCampos
  ],
  actualizarUsuario)

router.delete('/:id', validarJWT, borrarUsuario)

module.exports = router
