
const bcrypt = require('bcrypt');
require('dotenv').config()

class PasswordHandler {
    constructor(){
        this.saltRounds = process.env.saltRounds; 
    }

    hashPassword(password){
        return new Promise((resolve, reject)=>{
            bcrypt.genSalt(this.saltRounds, (err, salt) => {
                bcrypt.hash( password, salt, (err, hash) => {
                    if(err){
                        reject(err);
                    }
                    resolve(hash);
                });
            });

        })
    }

    doPasswordsMatch(passwordFromLogin,hashedPassword){
        return new Promise((resolve,reject)=>{
            bcrypt.compare(passwordFromLogin, hashedPassword, function(err, result) {
                if(result){
                    resolve(true)
                }else{
                    resolve(false)
                }
            });
        })
    }

}

module.exports = PasswordHandler;