/*
  Ruta: /api/upload
*/
const { Router } = require('express')
const expressfileUpload = require('express-fileupload')

const { validarJWT } = require('../middlewares/validar-jwt.js')
const { fileUpload } = require('../controllers/uploads.js')

const router = Router()
router.use(expressfileUpload())

router.put('/:coleccion/:id', validarJWT, fileUpload)

module.exports = router
