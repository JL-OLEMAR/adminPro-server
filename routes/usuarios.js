/*
  Ruta: /api/usuarios
*/
const { Router } = require('express')
const { getUsers, newUser } = require('../controllers/usuarios.js')

const router = Router()

router.get('/', getUsers)
router.post('/', newUser)

module.exports = router
