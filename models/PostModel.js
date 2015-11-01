var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
 name: {required: true, type: String},
 unit: {required: true, type: String},
 msg: {required: true, type: String},
});

mongoose.model('Post', PostSchema);
