'use strict';

const serviceLocator = require('app/lib/service_locator'),
    config = require('app/config/configs')();

serviceLocator.register('logger', () => {
    const logger = require('app/lib/logger').create(config.application_logging);

    return logger;
});

serviceLocator.register('sequelize', () => {
    const sequelize = require('sequelize');

    return sequelize;
});

serviceLocator.register('errs', () => {
    return require('restify-errors');
});

module.exports = serviceLocator;
