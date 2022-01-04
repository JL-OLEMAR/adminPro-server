/*
  Ruta: /api/medicos
*/
const { Router } = require('express')
const { check } = require('express-validator')

const { validarCampos } = require('../middlewares/validar-campos.js')
const { validarJWT } = require('../middlewares/validar-jwt.js')
const { getMedicos, newMedico, actualizarMedico, borrarMedico } = require('../controllers/medicos.js')

const router = Router()

router.get('/', getMedicos)

router.post('/',
  [
    validarJWT,
    check('nombre', 'El nombre del médico es obligatorio').not().isEmpty(),
    check('hospital', 'El id del hospital debe ser válido').isMongoId(),
    validarCampos
  ],
  newMedico
)

router.put('/:id',
  [
    validarJWT,
    check('nombre', 'El nombre del médico es obligatorio').not().isEmpty(),
    check('hospital', 'El id del hospital debe ser válido').isMongoId(),
    validarCampos
  ],
  actualizarMedico
)

router.delete('/:id', validarJWT, borrarMedico)

module.exports = router
