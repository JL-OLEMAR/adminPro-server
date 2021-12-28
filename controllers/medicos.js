const { response } = require('express')

const getMedicos = async (req, res = response) => {
  res.json({
    ok: true,
    msg: 'Get medicos'
  })
}

const newMedico = async (req, res = response) => {
  res.json({
    ok: true,
    msg: 'Crear Medico'
  })
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
