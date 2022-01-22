/*
  Ruta: /api/medicos
*/
const { Router } = require('express')
const { check } = require('express-validator')

const { validarCampos } = require('../middlewares/validar-campos.js')
const { validarJWT } = require('../middlewares/validar-jwt.js')
const { getMedicos, getMedicoById, newMedico, actualizarMedico, borrarMedico } = require('../controllers/medicos.js')

const router = Router()

// Get All Medicos
router.get('/', validarJWT, getMedicos)

// Get One Medico
router.get('/:id', validarJWT, getMedicoById)

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
