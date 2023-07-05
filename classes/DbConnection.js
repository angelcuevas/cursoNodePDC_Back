const mongoose = require('mongoose')

class DbConnection {
    constructor(connectionString){
        this.connectionString = connectionString; 
    }
    connect(){
        mongoose.connect(this.connectionString).then(()=>{
            console.log('connected')
        }).catch((err)=>{
            console.log('Error while connecting to database', err)
        })
    }
}

module.exports = DbConnection; 