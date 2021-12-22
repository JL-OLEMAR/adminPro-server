const express = require('express')
require('dotenv').config()
const { dbConnection } = require('./db/config.js')

// Crear el servidor de express
const app = express()

// Base de datos
dbConnection()

// Rutas
app.get('/', (req, res) => {
  res.json({
    ok: true,
    msg: 'Hola mundo'
  })
})

app.listen(process.env.PORT, () => {
  console.log(`Server corriendo en: http://localhost:${process.env.PORT}`)
})
