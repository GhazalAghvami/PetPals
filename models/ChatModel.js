var mongoose = require('mongoose');

var ChatSchema = new mongoose.Schema({
 name: {required: true, type: String},
 unit: {required: true, type: String},
 msg: {required: true, type: String},
});

mongoose.model('Chat', ChatSchema);
