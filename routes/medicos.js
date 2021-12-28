/*
  Ruta: /api/medicos
*/
const { Router } = require('express')
const { getMedicos, newMedico, actualizarMedico, borrarMedico } = require('../controllers/medicos.js')

const router = Router()

router.get('/', getMedicos)

router.post('/',
  [],
  newMedico
)

router.put('/:id',
  [],
  actualizarMedico
)

router.delete('/:id', borrarMedico)

module.exports = router
