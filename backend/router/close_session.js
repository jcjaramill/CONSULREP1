const express = require('express');
const router = express.Router();

// graba en auditrail cierre de sesion de usuarios
router.post('/', async(req, res)=>{
  console.log('close session')

  const body = req.body
  console.log(body)

  if(req.headers.authorization){
    res.json({
      status: 'success',
      message: `User ${body.user} close session successfully`
    })

  }else{
      res.json({
          status:'error',
          message:'User not authorized'
      })
  }


})





module.exports = router