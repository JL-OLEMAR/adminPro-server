require('dotenv').config()
const express = require('express')
const cors = require('cors')
const { dbConnection } = require('./db/config.js')

// Crear el servidor de express
const app = express()

// Config cors
app.use(cors())

// Lectura y parseo del body
app.use(express.json())

// Conectar a la base de datos
dbConnection()

// Rutas
app.use('/api/usuarios', require('./routes/usuarios.js'))
app.use('/api/login', require('./routes/auth.js'))

app.listen(process.env.PORT, () => {
  console.log(`Server corriendo en: http://localhost:${process.env.PORT}`)
})
