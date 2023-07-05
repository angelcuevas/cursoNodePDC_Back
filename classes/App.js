
const express = require('express')
const cors = require('cors');
const userRouter = require('../routes/users.routes');
const DbConnection = require('../classes/DbConnection');
const authRouter = require('../routes/auth.routes');
const chatroomsRouter = require('../routes/chatrooms.routes');
const http = require('http');
const { constants } = require('http2');


class App {
    constructor(port,dbConnectionString){
        this.port = port; 
        this.dbConnectionString = dbConnectionString
        this.app = express();
        this.server = http.createServer(this.app)
        this.setDataBaseConnection();
        this.setMiddlewares();
        this.setRoutes();
        this.io = require('socket.io')(this.server)
        this.setSocketConfig();
        
    }
    setMiddlewares(){
        this.app.use(express.json())
        this.app.use(cors())
         
    }
    setDataBaseConnection(){
        const dbConnection = new DbConnection(this.dbConnectionString)
        dbConnection.connect();
    }
    setRoutes(){
        this.app.use('/auth', authRouter)
        this.app.use('/users', userRouter)
        this.app.use('/chatrooms', chatroomsRouter)
    }
    startServer(){
        this.server.listen(this.port,()=>{
            console.log(`Server started at ${this.port}`)
        })
    }

    setSocketConfig(){

        this.chatroomData = {}

        this.io.on('connection', socket=>{
            console.log('user connected');

            socket.on('entered-chatroom', (payload)=>{
                if(!this.chatroomData[payload.chatroomId]){
                    this.chatroomData[payload.chatroomId] = new Set(); 
                }
                this.chatroomData[payload.chatroomId].add({username:payload.username, socketId: socket.id})
                this.io.emit('user-list', {chatroomId: payload.chatroomId, 
                    usernames: Array.from(this.chatroomData[payload.chatroomId])})
            })

            socket.on('new-message', (payload)=>{
                this.io.emit('new-message', payload)
            })

            socket.on('disconnect', (payload)=>{

                Object.keys(this.chatroomData).every(key=>{

                    let arr = Array.from(this.chatroomData[key])
                    if(arr){
                        arr = arr.filter(item=>{

                            if(item.socketId === socket.id ){
                                return false; 
                            }

                            return true; 
                        })
                        this.chatroomData[key] = new Set(arr.map(obj => obj));
                    }

                    return true; 
                }) 

                this.io.emit('new-message', payload)
            })
        })

 
    }
}

module.exports = App; 