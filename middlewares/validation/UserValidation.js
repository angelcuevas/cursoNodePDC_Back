const { body } = require('express-validator');

const UserValidation =  [
        body('username','username missing').notEmpty(),
        body('email', 'email missing').notEmpty(),
        body('password','Password missing').notEmpty(),
        body('password','Password must have be at least 6 characters long').isLength({ min: 6 }),
        body('email', 'Email format is not valid').isEmail()
]
    


module.exports = UserValidation