const jwt = require('jsonwebtoken')

const SECRET = process.env.secret

const generateJWT = (id = '')=>{
    return new Promise((resolve, reject)=>{

        const payload = {id}

        jwt.sign(payload, SECRET, {
            expiresIn: '1h'
        },(err, token)=>{
            if(err){
                console.log(err)
                reject('Token could not be benerated')
            }else{
                resolve(token)
            }
        })
    })
}

const verifyToken = (token)=>{
    try {
        const userData = jwt.verify(token, SECRET)
        return {isTokenValid:true, userData}; 
    }catch(e){
        return {isTokenValid: false, userData:null}; 
    }
    
}

module.exports = {
    generateJWT,
    verifyToken
}