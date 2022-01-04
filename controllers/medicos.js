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
      medico: medicoDB
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
  const medicoId = req.params.id
  const uid = req.uid // Obtiene el uid del token

  try {
    const medicoDB = await Medico.findById(medicoId)
    if (!medicoDB) {
      return res.status(404).json({
        ok: false,
        msg: 'Medico no encontrado'
      })
    }

    // Campos a actualizar
    const cambiosMedico = {
      ...req.body,
      usuario: uid
    }

    const medicoActualizado = await Medico
      .findByIdAndUpdate(medicoId, cambiosMedico, { new: true })

    res.json({
      ok: true,
      medico: medicoActualizado
    })
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'Comuniquese con el administrador'
    })
  }
}

const borrarMedico = async (req, res = response) => {
  const medicoId = req.params.id

  try {
    const medicoDB = await Medico.findById(medicoId)
    if (!medicoDB) {
      return res.status(404).json({
        ok: false,
        msg: 'Medico no encontrado'
      })
    }

    await Medico.findByIdAndDelete(medicoId)

    res.json({
      ok: true,
      msg: 'Medico eliminado'
    })
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'Comuniquese con el administrador'
    })
  }
}

module.exports = {
  getMedicos,
  newMedico,
  actualizarMedico,
  borrarMedico
}
