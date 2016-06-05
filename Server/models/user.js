const mongoose = require('../utils/mongoose');
const crypto = require('crypto');

const User = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    hashedPassword: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    }
});

User.virtual('password')
    .set(function(password) {
        this._plainPassword = password;
        this.salt = Math.random() + '';
        this.hashedPassword = this.encryptPassword(password);
    })
    .get(function() { return this._plainPassword });

User.methods.encryptPassword = function(password) {
    return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
};

User.methods.checkPassword = function(password) {
    return this.encryptPassword(password) === this.hashedPassword;
};

User.statics.authorize = function(username, password, cb) {
    var User = this;

    User.findOne({username: username}, (err, user) => {
        if (err) return cb(err);
        if (user) {
            if (user.checkPassword(password)) {
                return cb(null, user);
            }else {
                return cb('403');
            }
        } else {
            const user = new User({username: username, password: password});
            user.save((err, user) => {
                if (err) return cb(err);
                cb(null, user);
            });
        }
    });
};

module.exports = mongoose.model('User', User);
