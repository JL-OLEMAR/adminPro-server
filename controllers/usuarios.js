const Usuario = require('../models/usuario.js')

const getUsers = (req, res) => {
  res.json({
    ok: true,
    msg: 'get users'
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
