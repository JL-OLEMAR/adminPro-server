/* eslint-disable no-case-declarations, no-unreachable */
const fs = require('fs')
const Medico = require('../models/medico.js')
// const Usuario = require('../models/usuario.js')
// const Hospital = require('../models/hospital.js')

const actualizarImg = async (coleccion, id, nombreArchivo) => {
  switch (coleccion) {
    case 'medicos':
      const medico = await Medico.findById(id)
      if (!medico) {
        return false
      }

      const pathViejo = `./uploads/medicos/${medico.img}`
      if (fs.existsSync(pathViejo)) {
        // Borrar la imagen anterior del mismo medico
        fs.unlinkSync(pathViejo)
      }

      medico.img = nombreArchivo
      await medico.save()
      return true
      break

    case 'hospitales':

      break

    case 'usuarios':

      break
  }
}

module.exports = { actualizarImg }
