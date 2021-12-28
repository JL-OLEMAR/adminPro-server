/*
  Ruta: /api/hospitales
*/
const { Router } = require('express')
const { getHospitals, newHospital, actualizarHospital, borrarHospital } = require('../controllers/hospitales.js')

const router = Router()

router.get('/', getHospitals)

router.post('/',
  [],
  newHospital
)

router.put('/:id',
  [],
  actualizarHospital
)

router.delete('/:id', borrarHospital)

module.exports = router
