const Usuario = require('../models/usuario.js')

const getUsers = async (req, res) => {
  const usuarios = await Usuario.find({}, 'nombre email role google')

  res.json({
    ok: true,
    usuarios
  })
}

const newUser = async (req, res) => {
  const { nombre, password, email } = req.body
  const usuario = new Usuario({ nombre, password, email })

  await usuario.save()

  res.json({
    ok: true,
    usuario
  })
}

module.exports = { getUsers, newUser }
