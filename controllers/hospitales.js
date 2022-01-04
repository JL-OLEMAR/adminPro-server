const { response } = require('express')
const Hospital = require('../models/hospital.js')

const getHospitals = async (req, res = response) => {
  const hospitales = await Hospital
    .find()
    .populate('usuario', 'nombre img') // Populate: busca el id del usuario y lo trae con el nombre y la imagen

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
  const hospitalId = req.params.id
  const uid = req.uid // Obtiene el uid del token

  try {
    const hospitalDB = await Hospital.findById(hospitalId)
    if (!hospitalDB) {
      return res.status(404).json({
        ok: false,
        msg: 'Hospital no encontrado'
      })
    }

    // Campos a actualizar
    const cambiosHospital = {
      ...req.body,
      usuario: uid
    }

    const hospitalActualizado = await Hospital
      .findByIdAndUpdate(hospitalId, cambiosHospital, { new: true })

    res.json({
      ok: true,
      hospital: hospitalActualizado
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      msg: 'Comuniquese con el administrador'
    })
  }
}

const borrarHospital = async (req, res = response) => {
  const hospitalId = req.params.id

  try {
    const hospitalDB = await Hospital.findById(hospitalId)
    if (!hospitalDB) {
      return res.status(404).json({
        ok: false,
        msg: 'Hospital no encontrado'
      })
    }

    await Hospital.findByIdAndDelete(hospitalId)

    res.json({
      ok: true,
      msg: 'Hospital eliminado'
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      msg: 'Comuniquese con el administrador'
    })
  }
}

module.exports = {
  getHospitals,
  newHospital,
  actualizarHospital,
  borrarHospital
}
