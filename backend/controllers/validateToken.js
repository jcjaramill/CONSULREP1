//middlework para validar token
const jwt = require('jsonwebtoken')
var CryptoJS = require("crypto-js"); //encriptar


const verifyToken = (req, res, next) => {
    //console.log('HEADERS ', req.headers)
    if (req.headers.authorization){
        const secret_token = 'curiapo'
        const token1 = req.headers
        console.log('token1:', token1)
        const token = req.headers.authorization
        console.log('token received: ', `${token}`)
       // Decrypt token   
        //var decryp_token  = CryptoJS.AES.decrypt(token, 'dobleq3');
        //var Token = decryp_token.toString(CryptoJS.enc.Utf8);
        //console.log('token decryp: ', `${Token}`)

        //const a = Token.replace('Bearer ', '') //postman test

        console.log('path:', req.path)
        const method = req.method
        console.log('method:', method)
        if (!token){
            return res.json({status:'error', message: 'Access denied validateToken'})
        }

        try {
            jwt.verify(token, secret_token, async(err, decoded) => {
                if(err) {
                    console.log('Token expired')
                    return res.json({status: 'error', message:'Token expired'})
                }else{
                    console.log('se verifico', decoded);

                    // Crear una nueva instancia del objeto Date
                    const date = new Date(decoded.exp * 1000);

                    // Obtener el desplazamiento horario en minutos para Chile (GMT-4)
                    const offset = -240;

                    // Aplicar el desplazamiento horario al timestamp
                    const chileTimestamp = date.getTime() + offset * 60 * 1000;

                    // Crear una nueva instancia de Date utilizando el timestamp de Chile
                    const chileDate = new Date(chileTimestamp);

                    // Obtener la fecha y hora actual de Chile
                    const fechaActualChile = chileDate.toLocaleDateString('es-CL');
                    const horaActualChile = chileDate.toLocaleTimeString('es-CL');

                    console.log('Token expire: ', fechaActualChile +' '+ horaActualChile);

                    next();
                } 

            })

        } catch (error) {
            console.log('Token verification failed')
            return res.json({status:'error', message:'Token verification failed'})

        }

    } else{
        console.log('*User not authorized')
        return res.json({status:'error',message: '*User not authorized'})
    }

}


module.exports = verifyToken;
