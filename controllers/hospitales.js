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
  // Requiere el uid del usuario
  const uid = req.uid

  const hospital = new Hospital({
    usuario: uid,
    ...req.body
  })

  try {
    const hospitalDB = await hospital.save()

    res.json({
      ok: true,
      hospital: hospitalDB
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      msg: 'Comuniquese con el administrador'
    })
  }
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
