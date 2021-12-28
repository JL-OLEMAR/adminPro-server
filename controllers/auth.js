const { response } = require('express')
const bcrypt = require('bcryptjs')

const Usuario = require('../models/usuario.js')
const { generarJWT } = require('../helpers/jwt.js')

const login = async (req, res = response) => {
  const { email, password } = req.body

  try {
    // Verificar email
    const usuarioDB = await Usuario.findOne({ email })
    if (!usuarioDB) {
      return res.status(404).json({
        ok: false,
        msg: 'Email no encontrado'
      })
    }

    // Verificar password
    const validPassword = bcrypt.compareSync(password, usuarioDB.password)
    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: 'Password incorrecto'
      })
    }

    // Generar token - JWT
    const token = await generarJWT(usuarioDB.id)

    res.json({
      ok: true,
      token
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      msg: 'Error, contacte al administrador'
    })
  }
}

module.exports = {
  login
}
