const express = require('express');
const User = require('../models/user');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.render('index', {user: req.session.user});
});

router.get('/login', (req, res, next) => {
    require('../src/login')(res, false);
});

router.post('/login', (req, res, next) => {
    User.authorize(req.body.username, req.body.password, function(err, user) {
        if (err) return next(err);
        req.session.user = user._id;
        res.redirect('/');
    });
});

router.get('/logout', (req, res, next) => {
    req.session.destroy();
    res.redirect('/');
});

module.exports = router;
