const { response } = require('express')
const Medico = require('../models/medico.js')
// const Hospital = require('../models/hospital.js')

const getMedicos = async (req, res = response) => {
  res.json({
    ok: true,
    msg: 'Get medicos'
  })
}

const newMedico = async (req, res = response) => {
  // Requiere el uid, recibido por el token
  const uid = req.uid

  try {
    const medico = new Medico({
      usuario: uid,
      ...req.body
    })

    const medicoDB = await medico.save()

    res.json({
      ok: true,
      medicoDB
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      msg: 'Comuniquese con el administrador'
    })
  }
}

const actualizarMedico = async (req, res = response) => {
  res.json({
    ok: true,
    msg: 'Actualizar Medico'
  })
}

const borrarMedico = async (req, res = response) => {
  res.json({
    ok: true,
    msg: 'Borrar Medico'
  })
}

module.exports = {
  getMedicos,
  newMedico,
  actualizarMedico,
  borrarMedico
}
