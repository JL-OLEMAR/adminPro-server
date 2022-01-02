const { response } = require('express')
const { v4: uuidv4 } = require('uuid')
const { actualizarImg } = require('../helpers/actualizar-img.js')

const fileUpload = (req, res = response) => {
  const coleccion = req.params.coleccion
  const id = req.params.id

  // Validar que exista la colección
  const tiposValidos = ['hospitales', 'medicos', 'usuarios']
  if (!tiposValidos.includes(coleccion)) {
    return res.status(400).json({
      ok: false,
      msg: 'Tipo de colección no válida'
    })
  }

  // Validar que exista un archivo
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({
      ok: false,
      msg: 'No seleccionó ningún archivo'
    })
  }

  // Procesar la imagen
  const file = req.files.imagen

  // Tomar la extensión del archivo, ejemplo: .png .jpg etc
  const nombreCortado = file.name.split('.')
  const extensionArchivo = nombreCortado[nombreCortado.length - 1]

  // Validar que la extensión sea válida
  const extensionesValidas = ['png', 'jpg', 'gif', 'jpeg']
  if (!extensionesValidas.includes(extensionArchivo)) {
    return res.status(400).json({
      ok: false,
      msg: 'No es una extensión válida'
    })
  }

  // Generar el nombre del archivo
  const nombreArchivo = `${uuidv4()}.${extensionArchivo}`

  // Path donde se guardará el archivo
  const path = `./uploads/${coleccion}/${nombreArchivo}`

  // Mover la imagen
  file.mv(path, err => {
    if (err) {
      console.log(err)
      return res.status(500).json({
        ok: false,
        msg: 'Error al mover la imagen'
      })
    }

    // Actualizar la imagen en la base de datos
    actualizarImg(coleccion, id, nombreArchivo)

    res.json({
      ok: true,
      msg: 'Archivo subido correctamente',
      nombreArchivo
    })
  })
}

module.exports = { fileUpload }
