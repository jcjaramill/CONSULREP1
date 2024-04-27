const express = require('express');
const router = express.Router();

const inf_repuestos = require('../models/repuesto');

router.post('/', async(req, res)=>{
    console.log('busqueda_por_pieza route')
    const pieza = req.body.searchTerm
    console.log(typeof (pieza))
  try {
    const repuestos = await inf_repuestos.find({ 
        Pieza: { $regex: pieza, $options: 'i' }, 
    })
    console.log(repuestos)
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
