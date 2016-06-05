const mongoose = require('mongoose');
const config = require('../config');

mongoose.connect(config.get('db'));

module.exports = mongoose;
