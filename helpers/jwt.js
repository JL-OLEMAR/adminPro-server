const jwt = require('jsonwebtoken')

const generarJWT = (uid) => {
  return new Promise((resolve, reject) => {
    // Se esta mandando el uid al generar el token
    const payload = { uid }

    jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '12h'
    }, (err, token) => {
      if (err) {
        console.log(err)
        reject('No se pudo generar el token') // eslint-disable-line
      } else {
        resolve(token)
      }
    })
  })
}

module.exports = { generarJWT }
