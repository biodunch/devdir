'use strict';

const serviceLocator = require('app/lib/service_locator'),
    config = require('app/configs/configs')();

serviceLocator.register('logger', () => {
    const logger = require('app/lib/logger').create(config.application_logging);

    return logger;
});

serviceLocator.register('mongoose', () => {
    const mongoose = require('mongoose');

    return mongoose;
});

serviceLocator.register('errs', () => {
    return require('restify-errors');
});

module.exports = serviceLocator;
