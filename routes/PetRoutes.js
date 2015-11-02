var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Pet = mongoose.model('Pet');
var jwt = require('express-jwt');
var auth = jwt({
  userProperty: "payload", //req.payload._id in the Route
  secret: "Secret" //matches the secret in model
});


router.param('id', function(req, res, next, id) {
  Pet.findOne({
      _id: id
    })
    .exec(function(err, result) {
      if (!result) {
        res.status(404).send({
          err: "Could not find that specific pet."
        });
      }
      req.pet = result;
      next();
    });
});

router.post('/', auth, function(req, res, next) {
  var pet = new Pet(req.body);
  pet.save(function(err, result) {
    res.send(result);
  });

});

router.get('/', function(req, res, next) {
  Pet.find({}, function(err, result) {
    res.send(result);
  });
});


router.delete('/:id', auth, function(req, res, next) {
  Pet.remove({_id: req.params.id}, function(err, result) {
      if(err) {return next(err);}
      res.send();
  });
});

router.put('/:id', auth, function(req,res, next){
  Pet.update({_id: req.body._id}, req.body, function(err, result){
    if (err) return next(err);
    if (!result) return next ({err: "That pet wasnt found for updating"});
    res.send(result);
    });
  });



module.exports = router;
