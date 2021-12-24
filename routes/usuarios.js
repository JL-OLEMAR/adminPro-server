/*
  Ruta: /api/usuarios
*/
const { Router } = require('express')
const { check } = require('express-validator')

const { getUsers, newUser } = require('../controllers/usuarios.js')
const { validarCampos } = require('../middlewares/validar-campos.js')

const router = Router()

router.get('/', getUsers)
router.post('/',
  [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    validarCampos
  ],
  newUser
)

module.exports = router