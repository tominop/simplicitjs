var path = require('path');
var express = require('express');
var app = express();
var config = require('./config');

require('./middlewares')(app);

var appModules = config.get('appModules');
Object.keys(appModules).forEach(function(key) {
    app.use(appModules[key], require(path.join(__dirname, 'modules', key)));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: (config.get('NODE_ENV') === 'development' ? err : {})
    });
});

module.exports = app;