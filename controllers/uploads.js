const { response } = require('express')
// const Hospital = require('../models/hospital.js')

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

  // Procesar la imagen...

  res.json({
    ok: true,
    msg: 'Imagen subida correctamente',
    id
  })
}

module.exports = { fileUpload }
