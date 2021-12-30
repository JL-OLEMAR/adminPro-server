const { response } = require('express')
const Usuario = require('../models/usuario.js')

const getAll = async (req, res = response) => {
  const query = req.params.busqueda

  const usuarios = await Usuario.find({ nombre: query })

  res.json({
    ok: true,
    usuarios
  })
}

module.exports = {
  getAll
}
