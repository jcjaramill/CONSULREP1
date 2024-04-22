const express = require('express');
const router = express.Router();

const inf_repuestos = require('../models/repuesto');

router.get('/', async(req, res)=>{
  try {
    const repuestos = await inf_repuestos.find({}).sort({date:1})
    const items = repuestos.length
    console.log(items)
    if (items > 0){
        return res.json({
            status:'success',
            data:repuestos,
            items: items
        })

    }else{
        return res.json({
            status:'error',
            message:'No hay resultados. Intente otra busqueda',
            items: items
        })             
    } 

} catch (error) {
    console.log(error)      
}

})

module.exports = router
