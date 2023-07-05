const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const chatRoomSchema = new Schema({
  name: String,
  userId: String,
  createdAt: Date,
  updatedAt: Date
});

const ChatRoom = model('ChatRoom', chatRoomSchema);


module.exports = ChatRoom;