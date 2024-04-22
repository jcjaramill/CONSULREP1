const express = require('express');
const app = express();
const router = express.Router();
const path = require('path');
const port = 8002;
const cors = require('cors');

require('./serverDB')

app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Methods','Content-Type','Authorization');
    next(); 
})

app.set(__dirname)
console.log(__dirname)
app.use(express.static(path.resolve(__dirname, './public/')));

const validateRoutes = require('./controllers/validateToken')

app.use('/', require('./router/login'))
app.use('/repuestos', validateRoutes, require('./router/repuestos'))
app.use('/close_session', validateRoutes, require('./router/close_session'))



// Iniciar el servidor
app.listen(port, ()=>{
    console.log('server listening in port ' + port)
})