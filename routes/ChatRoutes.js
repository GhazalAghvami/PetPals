var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Chat = mongoose.model('Chat');
var jwt = require('express-jwt');
var auth = jwt({
  userProperty: "payload", //req.payload._id in the Route
  secret: "Secret" //matches the secret in model
});


router.param('id', function(req, res, next, id) {
  Chat.findOne({
      _id: id
    })
    .exec(function(err, result) {
      if (!result) {
        res.status(404).send({
          err: "Could not find that specific chat."
        });
      }
      req.chat = result;
      next();
    });
});

router.post('/', auth, function(req, res, next) {
  var chat = new Chat(req.body);
  chat.save(function(err, result) {
    res.send(result);
  });

});

router.get('/', function(req, res, next) {
  Chat.find({}, function(err, result) {
    res.send(result);
  });
});

module.exports = router;
