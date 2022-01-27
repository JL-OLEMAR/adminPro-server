require('dotenv').config()
const express = require('express')
const cors = require('cors')
const path = require('path')
const { dbConnection } = require('./db/config.js')

// Crear el servidor de express
const app = express()

// Config cors
app.use(cors())

// Lectura y parseo del body
app.use(express.json())

// Conectar a la base de datos
dbConnection()

// Directorio público
app.use(express.static('public'))

// Rutas
app.use('/api/usuarios', require('./routes/usuarios.js'))
app.use('/api/hospitales', require('./routes/hospitales.js'))
app.use('/api/medicos', require('./routes/medicos.js'))
app.use('/api/login', require('./routes/auth.js'))
app.use('/api/todo', require('./routes/busquedas.js'))
app.use('/api/upload', require('./routes/uploads.js'))

// Any route not found
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public/index.html'))
})

app.listen(process.env.PORT, () => {
  console.log(`Server corriendo en: http://localhost:${process.env.PORT}`)
})
