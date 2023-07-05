const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const userSchema = new Schema({
  username: String,
  password: String,
  email: String,
  createdAt: Date,
  updatedAt: Date,
  games: [{
    gameId: String
  }]
});

const User = model('User', userSchema);


module.exports = User;