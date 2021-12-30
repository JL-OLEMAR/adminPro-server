/*
  Ruta: /api/todo/:busqueda
*/
const { Router } = require('express')
const { validarJWT } = require('../middlewares/validar-jwt.js')
const { getAll } = require('../controllers/busquedas.js')

const router = Router()

router.get('/:busqueda', validarJWT, getAll)

module.exports = router
