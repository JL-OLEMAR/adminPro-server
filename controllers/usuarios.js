const { response } = require('express')
const bcrypt = require('bcryptjs')
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

  try {
    // Validar email sea unico
    const existeEmail = await Usuario.findOne({ email })
    if (existeEmail) {
      return res.status(400).json({
        ok: false,
        msg: 'El correo ya existe'
      })
    }

    const usuario = new Usuario({ nombre, password, email })

    // Encriptar password
    const salt = bcrypt.genSaltSync()
    usuario.password = bcrypt.hashSync(password, salt)

    // Save en la base de datos
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