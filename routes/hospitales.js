/*
  Ruta: /api/hospitales
*/
const { Router } = require('express')
const { check } = require('express-validator')

const { validarJWT } = require('../middlewares/validar-jwt.js')
const { validarCampos } = require('../middlewares/validar-campos.js')
const { getHospitals, newHospital, actualizarHospital, borrarHospital } = require('../controllers/hospitales.js')

const router = Router()

router.get('/', getHospitals)

router.post('/',
  [
    validarJWT,
    check('nombre', 'El nombre del hospital es obligatorio').not().isEmpty(),
    validarCampos
  ],
  newHospital
)

router.put('/:id',
  [
    validarJWT,
    check('nombre', 'El nombre del hospital es obligatorio').not().isEmpty(),
    validarCampos
  ],
  actualizarHospital
)

router.delete('/:id', borrarHospital)

module.exports = router
