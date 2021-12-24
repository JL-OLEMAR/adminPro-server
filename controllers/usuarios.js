const { response } = require('express')
const { validationResult } = require('express-validator')
const Usuario = require('../models/usuario.js')

const getUsers = async (req, res) => {
  const usuarios = await Usuario.find({}, 'nombre email role google')

  res.json({
    ok: true,
    usuarios
  })
}

const newUser = async (req, res = response) => {
  const { nombre, password, email } = req.body
  const errores = validationResult(req)

  if (!errores.isEmpty()) {
    return res.status(400).json({
      ok: false,
      errores: errores.mapped()
    })
  }

  try {
    const existeEmail = await Usuario.findOne({ email })
    if (existeEmail) {
      return res.status(400).json({
        ok: false,
        msg: 'El correo ya existe'
      })
    }

    const usuario = new Usuario({ nombre, password, email })
    await usuario.save()

    res.json({
      ok: true,
      usuario
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      msg: 'Error contacte al administrador'
    })
  }
}

module.exports = { getUsers, newUser }
