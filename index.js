const express = require('express')

// Crear el servidor de express
const app = express()

app.listen(3000, () => {
  console.log('Server corriendo en: http://localhost:' + 3000)
})
