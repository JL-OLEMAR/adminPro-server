require('dotenv').config()
const express = require('express')
const { dbConnection } = require('./db/config.js')
const cors = require('cors')

// Crear el servidor de express
const app = express()

// Config cors
app.use(cors())

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
