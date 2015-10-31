var mongoose = require('mongoose');

var PetSchema = new mongoose.Schema({
 owner: {required: true, type: String},
 unit: {required: true, type: String},
 name: {required: true, type: String},
 type: {required: true, type: String},
 bio: {required: true, type: String},
});

mongoose.model('Pet', PetSchema);
