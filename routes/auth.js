/*
  Ruta: /api/login
*/
const { Router } = require('express')
const { check } = require('express-validator')

const { validarCampos } = require('../middlewares/validar-campos.js')
const { validarJWT } = require('../middlewares/validar-jwt.js')
const { login, loginGoogle, renewToken } = require('../controllers/auth.js')

const router = Router()

router.post('/',
  [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    validarCampos
  ],
  login
)

router.post('/google',
  [
    check('token', 'El token de Google es obligatorio').not().isEmpty(),
    validarCampos
  ],
  loginGoogle
)

router.get('/renew', validarJWT, renewToken)

module.exports = router
