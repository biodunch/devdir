'use strict';

const serviceLocator = require('app/lib/service_locator');
const config = require('app/config/configs')();

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

serviceLocator.register('hashids', () => {
    const Hashids = require('hashids');
    return new Hashids(config.app.name);
});

serviceLocator.register('emailService', () => {
    const log = serviceLocator.get('logger');
    const errs = serviceLocator.get('errs');
    const EmailService = require('app/services/email');

    return new EmailService(log, errs);
});

serviceLocator.register('waitListService', () => {
    const models = {
        WaitList: require('app/models').WaitList,
    };
    const log = serviceLocator.get('logger');
    const errs = serviceLocator.get('errs');
    const emailService = serviceLocator.get('emailService');
    const hashids = serviceLocator.get('hashids');
    const WaitListService = require('app/services/waitlist');

    return new WaitListService(log, errs, models, emailService, hashids);
});

serviceLocator.register('authService', () => {
    const models = {
        Affiliate: require('app/models').Affiliate,
        Merchant: require('app/models').Merchant
    };
    const log = serviceLocator.get('logger');
    const errs = serviceLocator.get('errs');
    const emailService = serviceLocator.get('emailService');
    const AuthService = require('app/services/auth');

    return new AuthService(log, errs, models, emailService);
});

serviceLocator.register('affiliateService', () => {
    const models = {
        Affiliate: require('app/models').Affiliate,
        Merchant: require('app/models').Merchant,
        Wallet: require('app/models').AffiliateWallet
    };
    const log = serviceLocator.get('logger');
    const errs = serviceLocator.get('errs');
    const AffiliateService = require('app/services/affiliate');

    return new AffiliateService(log, errs, models);
});

serviceLocator.register('merchantService', () => {
    const models = {
        Affiliate: require('app/models').Affiliate,
        Merchant: require('app/models').Merchant,
        Wallet: require('app/models').MerchantWallet
    };
    const log = serviceLocator.get('logger');
    const errs = serviceLocator.get('errs');
    const MerchantService = require('app/services/merchant');

    return new MerchantService(log, errs, models);
});

serviceLocator.register('waitListController', () => {
    const log = serviceLocator.get('logger');
    const waitListService = serviceLocator.get('waitListService');
    const WaitListController = require('app/controllers/waitlist');

    return new WaitListController(waitListService, log);
});

serviceLocator.register('authController', () => {
    const log = serviceLocator.get('logger');
    const authService = serviceLocator.get('authService');
    const AuthController = require('app/controllers/auth');

    return new AuthController(authService, log);
});

serviceLocator.register('merchantController', () => {
    const log = serviceLocator.get('logger');
    const merchantService = serviceLocator.get('merchantService');
    const MerchantController = require('app/controllers/merchant');

    return new MerchantController(merchantService, log);
});

serviceLocator.register('affiliateController', () => {
    const log = serviceLocator.get('logger');
    const affiliateService = serviceLocator.get('affiliateService');
    const AffiliateController = require('app/controllers/affiliate');

    return new AffiliateController(affiliateService, log);
});

module.exports = serviceLocator;
