const express = require('express');
const User = require('../models/user');
const router = express.Router();

router.get('/', function(req, res, next) {
    res.render('login');
});

router.post('/', function(req, res, next) {
   User.authorize(req.body.username, req.body.password, function(err, user) {
       if (err) return next(err);
       req.session.user = user._id;
       res.end();
   });
});

module.exports = router;
