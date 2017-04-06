var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var Shelter = require('../models/shelter');


/* GET shelters */
router.get('/', function(req, res, next) {
  console.log('req.user ', req.user);
  var userId = req.user.sub;

  Shelter.find({ userId: userId}, function(err, shelters) {
    if(err) {
      console.log('Db error: ', err);
      res.status(500).json({});
    }
    if(!shelters) {
      res.status(404).json({});
    }
    res.json(shelters);
  });
});

router.get('/:shelterId', function(req, res){
  var userId = req.user.sub;
  var shelter = req.params.shelterId;

  Shelter.findById({ _id: shelter}, function(err, shelter) {
    if(err) {
      console.log('DB error: ', err);
      res.status(500).json({});
    }
    if(!shelter) {
      res.status(404).json({});
    }
    res.json(shelter);
  });
});

router.post('/', function(req, res){
  var userId = req.user.sub;
  var description = req.body.description;
  var dueDate = null;

  var newShelter = new Shelter({
    description: description,
    userId: userId
  });
  newShelter.save(function(err, shelter){
    if(err){
      console.log('DB error: ', err);
      res.status(500).json({});
    }
    res.json(shelter);
  });
});

function updateShelter(req, res){
  var userId = req.user.sub;
  var shelterId = req.params.shelterId;

  Shelter.findByIdAndUpdate({_id: shelterId},function(err, shelter){
    if(err) {
      console.log('Db error: ', err);
      res.status(500).json({});
    }
    res.json(shelter);
  });
};

router.put('/:shelterId', updateShelter);
router.patch('/:shelterId', updateShelter);

router.delete('/:shelterId', function(req, res){
  var shelterId = req.params.shelterId;
  var userId = req.user.sub;

  req.description = req.body.description || req.discription;
  req.completed = req.body.completed || req.completed;
  req.dueDate = req.body.dueDate || req.dueDate;

  Shelter.findByIdAndRemove({_id: shelterId},function(err, shelter){

    if(err) {
      console.log('Db error: ', err);
    }
    res.json(shelter);
  });
});

module.exports = router;
