const { response } = require('express')
const bcrypt = require('bcryptjs')

const Usuario = require('../models/usuario.js')
const { generarJWT } = require('../helpers/jwt.js')

const getUsers = async (req, res) => {
  const desde = Number(req.query.desde) || 0

  /* Forma de ejecutar en silmutanio ambas consultas, no esperar
   a que se ejecuten uno a la vez, y retornan en la posición del array */
  const [usuarios, total] = await Promise.all([
    Usuario
      .find({}, 'nombre email role google')
      .skip(desde) // Salta los primeros 5 registros
      .limit(5), // Muestra solo 5 registros por página

    Usuario.count()
  ])

  res.json({
    ok: true,
    usuarios,
    total
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

    // Generar token - JWT
    const token = await generarJWT(usuario._id)

    res.json({
      ok: true,
      usuario,
      token
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

    // Captura los campos a actualizar enviados por el cliente, excluyendo email, password y google
    const { email, password, google, ...campos } = req.body

    // Si el email es distinto al actual, se actualizarán los campos no excluidos
    if (usuarioDB.email !== email) {
      const existeEmail = await Usuario.findOne({ email })

      // Siempre y cuando el email, no sea acupado por otro usuario
      if (existeEmail) {
        return res.status(400).json({
          ok: false,
          msg: 'El usuario ya existe con ese email'
        })
      }
    }

    // Asigna email, pues lineas anteriores se esta excluyendo el email
    campos.email = email

    // Aqui, se actualizará los nuevos campos del usuario
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

const borrarUsuario = async (req, res = response) => {
  const uid = req.params.id

  try {
    const usuarioDB = await Usuario.findById(uid)
    if (!usuarioDB) {
      return res.status(404).json({
        ok: false,
        msg: 'El usuario no existe por ese id'
      })
    }

    await Usuario.findByIdAndDelete(uid)

    res.json({
      ok: true,
      msg: 'Usuario eliminado'
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
  newUser,
  getUsers,
  actualizarUsuario,
  borrarUsuario
}
