const {Router} = require('express');
const { login } = require('../controllers/auth.controller');

const authRouter = new Router();

authRouter.post('/login', login);

module.exports = authRouter;