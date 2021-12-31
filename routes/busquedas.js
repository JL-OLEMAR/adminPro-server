/*
  Ruta: /api/todo
*/
const { Router } = require('express')
const { validarJWT } = require('../middlewares/validar-jwt.js')
const { getAll, getDocumentosColeccion } = require('../controllers/busquedas.js')

const router = Router()

router.get('/:busqueda', validarJWT, getAll)
router.get('/coleccion/:tabla/:busqueda', validarJWT, getDocumentosColeccion)

module.exports = router
