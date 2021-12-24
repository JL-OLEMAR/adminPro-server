const getUsuarios = (req, res) => {
  res.json({
    ok: true,
    usuarios: []
  })
}

module.exports = { getUsuarios }
