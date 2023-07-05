const {Router} = require('express');
const { getUser, saveUser, getAllUsers,updateUser, deleteUser } = require('../controllers/users.controller');
const tokenValidation = require('../middlewares/tokenValidation');
const UserValidation = require('../middlewares/validation/UserValidation');

const userRouter = new Router();

userRouter.get('/', getAllUsers);
userRouter.get('/:id', getUser);
userRouter.post('/',  UserValidation, saveUser);
userRouter.put('/',  [...UserValidation, tokenValidation], updateUser);
userRouter.delete('/:id',deleteUser);

module.exports = userRouter;