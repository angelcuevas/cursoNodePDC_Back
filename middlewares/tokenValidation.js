const { verifyToken } = require("../utils/jwt");
const User  = require("../models/User")


const tokenValidation = async (req, res, next)=>{
    try{
        const token = req.header('authorization')
        if(!token){
            return res.status(401).json({
                message:'No token present in request'
            })
        }
    
        const {isTokenValid, userData} = verifyToken(token)

        if(isTokenValid){
            const user = await User.findOne({_id: userData.id})
            //req.user = user; 
    
            next();
        }else{
            return res.status(401).json({
                message:'Token is invalid'
            })
        }
    }catch(e){
        res.status(401).json({
            message:'Invalid credentials ' + e
        })
    }
  
}

module.exports = tokenValidation;
