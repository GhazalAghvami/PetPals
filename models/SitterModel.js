var mongoose = require('mongoose');

var SitterSchema = new mongoose.Schema({
 name: {required: true, type: String},
 unit: {required: true, type: String},
 bio: {required: true, type: String},
});

mongoose.model('Sitter', SitterSchema);
