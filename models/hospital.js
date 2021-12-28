const { Schema, model } = require('mongoose')

const HospitalSchema = Schema({
  nombre: {
    type: String,
    required: true
  },
  img: {
    type: String
  },
  usuario: {
    type: Schema.Types.ObjectId,
    ref: 'Usuario'
  }
}, { collection: 'hospitales' }) // Nombre de la colección en la base de datos

HospitalSchema.method('toJSON', function () {
  const { __v, ...object } = this.toObject()
  return object
})

module.exports = model('Hospital', HospitalSchema)
