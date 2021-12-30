const { response } = require('express')

const getAll = async (req, res = response) => {
  const query = req.params.busqueda

  res.json({
    ok: true,
    msg: 'Todo bien',
    query
  })
}

module.exports = {
  getAll
}
