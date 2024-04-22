const express = require('express');
const router = express.Router();
const bcryptjs = require('bcryptjs') // passwords
const jwt = require('jsonwebtoken') // tokens
const joi = require('@hapi/joi')  //validaciones
var CryptoJS = require("crypto-js"); //encriptar
const ESAPI = require('node-esapi')  //codificar


const dbusers = require('../models/user');

const schemaLogin = joi.object({
    username: joi.string().min(4).max(255).required(),
    password: joi.string().min(4).max(1024).required(),
})

router.get('/', (req, res)=>{
  
  res.json({
    status: 'success',
    message: 'Login Consulrep'
  })
})

router.post('/auth', async(req, res)=>{
  const { error } = schemaLogin.validate(req.body)
  if (error) {
    return res.status(404).json({ error: error.details[0].message })

  }
  const username = req.body.username
  console.log('esta es el username:', username)
  const password = req.body.password
  console.log('esta es el password:', password)


 // Decrypt    
  var decryp_username  = CryptoJS.AES.decrypt(username, 'dobleq3');
  var Username = decryp_username.toString(CryptoJS.enc.Utf8);

  var decryp_password  = CryptoJS.AES.decrypt(password, 'dobleq3');
  var Password = decryp_password.toString(CryptoJS.enc.Utf8);

  console.log(ESAPI.encoder().encodeForJavaScript(Username), ESAPI.encoder().encodeForJavaScript(Password)); 



  try {

    const usersDB = await dbusers.findOne({ username: username })
    console.log('se realizo la busqueda de: ', usersDB)
    if (usersDB === null) {
      return res.json({message: 'Nombre de usuario y/o contraseña no válidos' })

    } else {

      bcryptjs.compare(password, usersDB.password)
        .then(match => {
          if (match) {
            //res.status(200).send({message:'usuario acceso de forma exitosa'}) //para probar respuesta del servidor
            const secret_token =  'curiapo'

            payload = {
              name: usersDB.name,
              username: usersDB.username,
              role: usersDB.role
            }
            jwt.sign(payload, secret_token,{expiresIn:300}, (err, token) => {
              if (err) {
                res.json({
                  estado: false,
                  error: err,
                  mensaje: 'no se autentico'
                })

              }else{
                  console.log('pasò')

                  res.json({
                    token: token,
                    role: payload.role,
                    username: payload.username
                  }) 
              }

            })

          } else {
            res.status(404).json({ message: 'contraseña de usuario incorrecta' })
          }
        })

    }

  } catch (error) {
    console.log(error)
    return res.json({
      error: true, 
      mensaje: 'Error al procesar solicitud'
    })


  }

})


module.exports = router;