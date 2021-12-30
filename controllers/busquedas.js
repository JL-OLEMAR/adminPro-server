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

module.exports = {
  getAll
}
