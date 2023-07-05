const {Router} = require('express');
const { getAllChatrooms, getChatroom, saveChatroom, updateChatroom, deleteChatroom } = require('../controllers/chatrooms.controller');
const tokenValidation = require('../middlewares/tokenValidation');
const ChatRoomValidation = require('../middlewares/validation/ChatRoomValidation');

const chatroomsRouter = new Router();

chatroomsRouter.get('/', tokenValidation, getAllChatrooms);
chatroomsRouter.get('/:id', tokenValidation, getChatroom);
chatroomsRouter.post('/', [...ChatRoomValidation,tokenValidation], saveChatroom);
chatroomsRouter.put('/',  [...ChatRoomValidation,tokenValidation], updateChatroom);
chatroomsRouter.delete('/:id',tokenValidation, deleteChatroom);

module.exports = chatroomsRouter;