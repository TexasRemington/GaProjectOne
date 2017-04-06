var mongoose = require('mongoose');

var schema = new mongoose.Schema({
  userId: { type: String, required: true, index: true},
  description: { type: String, required: true},
  createdAt: {type: Date, default: Date.now},
});

var User = mongoose.model('User', schema);

module.exports = User;
