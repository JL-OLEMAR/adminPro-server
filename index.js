const express = require('express')

// Crear el servidor de express
const app = express()

// Rutas
app.get('/', (req, res) => {
  res.json({
    ok: true,
    msg: 'Hola mundo'
  })
})

app.listen(3000, () => {
  console.log('Server corriendo en: http://localhost:' + 3000)
})
