/* eslint-disable no-case-declarations, no-unreachable */
const fs = require('fs')
const Medico = require('../models/medico.js')
const Hospital = require('../models/hospital.js')
const Usuario = require('../models/usuario.js')

let pathViejo = ''

const borrarImg = (path) => {
  if (fs.existsSync(path)) {
    // Borrar la imagen anterior del mismo medico
    fs.unlinkSync(path)
  }
}

const actualizarImg = async (coleccion, id, nombreArchivo) => {
  switch (coleccion) {
    case 'medicos':
      const medico = await Medico.findById(id)
      if (!medico) {
        return false
      }

      pathViejo = `./uploads/medicos/${medico.img}`
      borrarImg(pathViejo)

      medico.img = nombreArchivo
      await medico.save()
      return true
      break

    case 'hospitales':
      const hospital = await Hospital.findById(id)
      if (!hospital) {
        return false
      }

      pathViejo = `./uploads/hospitales/${hospital.img}`
      borrarImg(pathViejo)

      hospital.img = nombreArchivo
      await hospital.save()
      return true
      break

    case 'usuarios':
      const usuario = await Usuario.findById(id)
      if (!usuario) {
        return false
      }

      pathViejo = `./uploads/usuarios/${usuario.img}`
      borrarImg(pathViejo)

      usuario.img = nombreArchivo
      await usuario.save()
      return true
      break
  }
}

module.exports = { actualizarImg }
