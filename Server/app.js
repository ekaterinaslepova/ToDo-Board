const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const log = require('winston');
const ejs = require('ejs');
const path = require('path');
const config = require('./config');
const errorhandler = require('errorhandler');
const router = require('./routes');
const mongoose = require('./utils/mongoose');

const app = express();

app.engine('ejs', require('ejs-locals'));
app.set('views', path.join(__dirname, './templates'));
app.set('view engine', 'ejs');

app.use(require('body-parser').urlencoded({ extended: false }));
app.use(require('cookie-parser')());

app.use(session({
    secret: config.get('session:secret'),
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({mongooseConnection: mongoose.connection})
}));

app.use(router);
app.use(express.static(path.join(__dirname, 'public')));

if (app.get('env') === 'development') {
    app.use(errorhandler());
}

app.use((err, req, res, next) => {
    if (err === '403') {
        res.sendStatus(403);
    }
});

app.listen(config.get('port'), () => {
    log.info('Server start');
});
