const { response } = require('express')
const bcrypt = require('bcryptjs')

const Usuario = require('../models/usuario.js')
const { generarJWT } = require('../helpers/jwt.js')
const { googleVerify } = require('../helpers/google-verify.js')

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
    const token = await generarJWT(usuarioDB._id)

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

const loginGoogle = async (req, res = response) => {
  const tokenGoogle = req.body.token

  try {
    const { name, email, picture } = await googleVerify(tokenGoogle)

    const usuarioDB = await Usuario.findOne({ email })
    let usuario

    if (!usuarioDB) {
      // Si el usuario no existe en la bd, se crea
      usuario = new Usuario({
        nombre: name,
        email,
        password: '@@@',
        img: picture,
        google: true
      })
    } else {
      // Existe usuario
      usuario = usuarioDB
      usuario.google = true
    }

    // Save usuario
    await usuario.save()

    // Generar token - JWT
    const token = await generarJWT(usuario._id)

    res.json({
      ok: true,
      token
    })
  } catch (error) {
    res.status(401).json({
      ok: false,
      msg: 'Token no válido'
    })
  }
}

// Generar un token nuevo
const renewToken = async (req, res = response) => {
  // Obtiene el id del usuario, mediante el token solicitado
  const { uid } = req

  // Obtener el usuario por el uid
  const usuario = await Usuario.findById(uid)
  if (!usuario) {
    return res.status(404).json({
      ok: false,
      msg: 'Email no encontrado'
    })
  }

  // Generar token - JWT
  const token = await generarJWT(uid)

  res.json({
    ok: true,
    token,
    usuario
  })
}

module.exports = {
  login,
  loginGoogle,
  renewToken
}
