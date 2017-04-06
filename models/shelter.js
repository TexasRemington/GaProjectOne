var mongoose = require('mongoose');

var schema = new mongoose.Schema({
  shelterId: { type: String, required: true, index: true},
  description: { type: String, required: true},
  location: { type: String, required: true},
  createdAt: {type: Date, default: Date.now},
  animal: { type: String, index: true}
});

var Shelter = mongoose.model('Shelter', schema);

module.exports = Shelter;
