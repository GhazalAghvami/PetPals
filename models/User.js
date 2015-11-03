var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

var UserSchema = new mongoose.Schema({
name: {required: true, type: String, lowercase: true, trim: true},
unit: {required: true, type: String, lowercase: true, trim: true},
username: {required: true, unique: true, type: String, lowercase: true, trim: true},
email: {required: true, unique: true, type:String, lowercase: true, trim: true},
passwordHash: String,
salt: String,
sitters: [{type: mongoose.Schema.Types.ObjectId, ref: 'Sitter'}],
pets: [{type: mongoose.Schema.Types.ObjectId, ref: 'Pet'}]
});

UserSchema.methods.setPassword = function(password) {
 this.salt = crypto.randomBytes(16).toString('hex');
    this.passwordHash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

UserSchema.methods.checkPassword = function(password) {
 var passwordHash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
 return (passwordHash === this.passwordHash);
};

UserSchema.methods.createToken = function() {
 return jwt.sign({
   _id: this._id,
   username: this.username,
   name: this.name,
   email: this.email,
   unit: this.unit

 }, process.env.AUTH_SECRET); //Add Passcode here
};

mongoose.model('User', UserSchema);
