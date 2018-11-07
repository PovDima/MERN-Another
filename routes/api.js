const express = require('express');
const router = express.Router();
const User = require('../models/user');
// GET a list of Users from the DB
router.get('/users', (req, res, next) => {
  User.aggregate().near({
    near: [parseFloat(req.query.lng), parseFloat(req.query.lat)],
    maxDistance: 100000000,
    spherical: true,
    distanceField: 'dist.calculated'
  }).then(function (users) {
    res.send(users)
  }).catch(next)
});

// Add new User ot the DB
router.post('/users', (req, res, next) => {
  User.create(req.body)
    .then(user => {
      res.send(user);
    })
    .catch(next);
});

// Update user in the DB
router.put('/users/:id', (req, res, next) => {
  User.findOneAndUpdate({ _id: req.params.id }, req.body)
    .then(user => {
      User.findById({ _id: req.params.id })
        .then(user => {
          res.send(user)
        })
    })
    .catch(next)
});

// Delete user from the DB
router.delete('/users/:id', (req, res, next) => {
  User.findOneAndRemove({ _id: req.params.id })
    .then(user => {
      res.send(user)
    })
    .catch(next);
});

module.exports = router;