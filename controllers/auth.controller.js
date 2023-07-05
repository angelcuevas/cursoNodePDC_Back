const PasswordHandler = require("../classes/PasswordHandler");
const User  = require("../models/User");
const { generateJWT } = require("../utils/jwt");

const login = async (req, res)=>{
    const {email, password} = req.body; 
    try{
        const user = await User.findOne({email});

        if(!user){
            return res.status(401).json({
                message:'Invalid access information'
            })
        }
        const passwordHandler = new PasswordHandler();

        const doPasswordsMatch = await passwordHandler.doPasswordsMatch(password, user.password)
        
        if(doPasswordsMatch){
            const token = await generateJWT(user.id)
            res.status(200).json({
                token,
                user: user,
                message:'logged in successfully'
            })
        }else{
            res.status(401).json({
                message:'Invalid access information'
            })
        }

    }catch(e){
        res.status(500).json({
            message: 'There has been an error '+ e
        })
    }
}


module.exports = {
    login
}