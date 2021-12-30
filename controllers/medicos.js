const { response } = require('express')
const Medico = require('../models/medico.js')

const getMedicos = async (req, res = response) => {
  const medicos = await Medico
    .find()
    .populate('usuario', 'nombre img') // Populate: busca el id del usuario y lo trae con el nombre y la imagen
    .populate('hospital', 'nombre img') // Populate: busca el id del hospital y lo trae con el nombre y la imagen

  res.json({
    ok: true,
    medicos
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
