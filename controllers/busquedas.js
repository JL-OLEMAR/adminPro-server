const { response } = require('express')
const Usuario = require('../models/usuario.js')
const Medico = require('../models/medico.js')
const Hospital = require('../models/hospital.js')

const getAll = async (req, res = response) => {
  const busqueda = req.params.busqueda
  /* i = case insensitive, signica que busca por todo el texto,
  mayusculas, minusculas, espacios entre el campo, etc
  (todo lo que esta dentro del campo a buscar) */
  const regex = new RegExp(busqueda, 'i')

  const [usuarios, medicos, hospitales] = await Promise.all([
    Usuario.find({ nombre: regex }),
    Medico.find({ nombre: regex }),
    Hospital.find({ nombre: regex })
  ])

  res.json({
    ok: true,
    usuarios,
    medicos,
    hospitales
  })
}

const getDocumentosColeccion = async (req, res = response) => {
  const tabla = req.params.tabla
  const busqueda = req.params.busqueda
  /* i = case insensitive, signica que busca por todo el texto,
  mayusculas, minusculas, espacios entre el campo, etc
  (todo lo que esta dentro del campo a buscar) */
  const regex = new RegExp(busqueda, 'i')

  let data = []

  switch (tabla) {
    case 'medicos':
      data = await Medico
        .find({ nombre: regex })
        .populate('usuario', 'nombre img')
        .populate('hospital', 'nombre img')

      break

    case 'hospitales':
      data = await Hospital
        .find({ nombre: regex })
        .populate('usuario', 'nombre img')
      break

    case 'usuarios':
      data = await Usuario.find({ nombre: regex })
      break

    default:
      return res.status(400).json({
        ok: false,
        msg: 'La tabla tiene que ser: usuarios, médicos o hospitales'
      })
  }

  return res.json({
    ok: true,
    resultados: data
  })
}

module.exports = {
  getAll,
  getDocumentosColeccion
}
