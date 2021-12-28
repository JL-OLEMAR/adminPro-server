const { response } = require('express')
const Hospital = require('../models/hospital.js')

const getHospitals = async (req, res = response) => {
  const hospitales = await Hospital.find({}, 'nombre Ususario')

  res.json({
    ok: true,
    hospitales
  })
}

const newHospital = async (req, res = response) => {
  res.json({
    ok: true,
    msg: 'Crear hospital'
  })
}

const actualizarHospital = async (req, res = response) => {
  res.json({
    ok: true,
    msg: 'Actualizar hospital'
  })
}

const borrarHospital = async (req, res = response) => {
  res.json({
    ok: true,
    msg: 'Borrar hospital'
  })
}

module.exports = {
  getHospitals,
  newHospital,
  actualizarHospital,
  borrarHospital
}
