const { body } = require('express-validator');

const ChatRoomValidation =  [
        body('name','name missing').notEmpty()
]
    


module.exports = ChatRoomValidation