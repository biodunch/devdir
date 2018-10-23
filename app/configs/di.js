'use strict';

const serviceLocator = require('../lib/service_locator'),
    config = require('./configs')();

serviceLocator.register('logger', () => {
    const logger = require('../lib/logger').create(config.application_logging);

    return logger;
});

serviceLocator.register('mongoose', () => {
    const mongoose = require('mongoose');

    return mongoose;
});

serviceLocator.register('errs', () => {
    return require('restify-errors');
});

serviceLocator.register('rolesService', () => {
    const log = serviceLocator.get('logger');
    const mongoose = serviceLocator.get('mongoose');
    const RolesService = require('../services/roles');

    return new RolesService(log, mongoose);
});

serviceLocator.register('contactsService', () => {
    const log = serviceLocator.get('logger');
    const mongoose = serviceLocator.get('mongoose');
    const errs = serviceLocator.get('errs');
    const rolesService = serviceLocator.get('rolesService');
    const ContactsService = require('../services/contacts');

    return new ContactsService(rolesService, log, errs, mongoose);
});

serviceLocator.register('contactsController', () => {
    const contactsService = serviceLocator.get('contactsService');
    const rolesService = serviceLocator.get('rolesService');
    const log = serviceLocator.get('logger');
    const ContactsController = require('../controllers/contacts');

    return new ContactsController(contactsService, rolesService, log);
});

module.exports = serviceLocator;
