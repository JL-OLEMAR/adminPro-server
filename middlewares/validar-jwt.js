const { response } = require('express')
const jwt = require('jsonwebtoken')
const Usuario = require('../models/usuario.js')

const validarJWT = (req, res, next) => {
  // Leer el token
  const token = req.header('x-token')
  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: 'No hay token'
    })
  }

  try {
    // Verifica que el token enviado, conincida con la firma
    const { uid } = jwt.verify(token, process.env.JWT_SECRET)
    req.uid = uid
    next()
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: 'Token no válido'
    })
  }
}

// Check if the user is an admin
const validarADMINROLE = async (req, res = response, next) => {
  // Req uid
  const uid = req.uid

  try {
    // Find user by id in the DB
    const usuarioDB = await Usuario.findById(uid)

    // Check if user exists
    if (!usuarioDB) {
      return res.status(404).json({
        ok: false,
        msg: 'Usuario no existe'
      })
    }

    // Check if user is admin
    if (usuarioDB.role !== 'ADMIN_ROLE') {
      return res.status(401).json({
        ok: false,
        msg: 'No tiene permisos para realizar esta acción'
      })
    }

    // If everything is ok, continue
    next()
  } catch (error) {
    // If error, return error
    console.log(error)
    res.status(500).json({
      ok: false,
      msg: 'Comuniquese con el administrador'
    })
  }
}

// Check if the user is the same
const validarSameUser = async (req, res = response, next) => {
  const uid = req.uid // Req uid
  const id = req.params.id // Req id from params

  try {
    // Find user by id in the DB
    const usuarioDB = await Usuario.findById(uid)

    // Check if user exists
    if (!usuarioDB) {
      return res.status(404).json({
        ok: false,
        msg: 'Usuario no existe'
      })
    }

    // Check if the user is admin or the same user
    if (usuarioDB.role === 'ADMIN_ROLE' || uid === id) {
      // If everything is ok, continue
      next()
    } else {
      return res.status(401).json({
        ok: false,
        msg: 'No tiene permisos para realizar esta acción'
      })
    }
  } catch (error) {
    // If error, return error
    console.log(error)
    res.status(500).json({
      ok: false,
      msg: 'Comuniquese con el administrador'
    })
  }
}

module.exports = {
  validarJWT,
  validarADMINROLE,
  validarSameUser
}
