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

const actualizarUsuario = async (req, res = response) => {
  // TODO: Validar token y comprobar si es el usuario correcto

  const uid = req.params.id

  try {
    const usuarioDB = await Usuario.findById(uid)

    if (!usuarioDB) {
      return res.status(404).json({
        ok: false,
        msg: 'El usuario no existe por ese id'
      })
    }

    // Captura los campos a actualizar
    const campos = req.body

    // Si el email es igual al actual no se actualiza,
    if (usuarioDB.email === req.body.email) {
      delete campos.email
    } else {
      // de lo contrario se actualizará el email, siempre y cuando no sea acupado por otro usuario
      const existeEmail = await Usuario.findOne({ email: req.body.email })
      if (existeEmail) {
        return res.status(400).json({
          ok: false,
          msg: 'El usuario ya existe con ese email'
        })
      }
    }

    delete campos.password // No se actualizará el password
    delete campos.google // No se actualizará google

    const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, { new: true })

    res.json({
      ok: true,
      usuario: usuarioActualizado
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      msg: 'Error, contacte al administrador'
    })
  }
}

module.exports = { actualizarUsuario, getUsers, newUser }
