const middlewares = require('app/routes/middlewares');

module.exports.register = (server, serviceLocator) => {
    server.post(
        {
            path: '/merchants',
            name: 'Create a Merchant',
            version: '1.0.0',
            validation: {
                body: require('../validations/create_merchant')
            }
        },
        (req, res, next) =>
            serviceLocator
                .get('merchantController')
                .createMerchant(req, res, next)
    );

    server.post(
        {
            path: '/affiliates',
            name: 'Create an Affiliate',
            version: '1.0.0',
            validation: {
                body: require('../validations/create_affiliate')
            }
        },
        (req, res, next) =>
            serviceLocator
                .get('affiliateController')
                .createAffiliate(req, res, next)
    );

    server.post(
        {
            path: '/basic-login',
            name: 'Login',
            version: '1.0.0',
            validation: {
                body: require('../validations/basic_login')
            }
        },
        (req, res, next) =>
            serviceLocator.get('authController').basicLogin(req, res, next)
    );

    server.get(
        {
            path: '/affiliates/:id',
            name: 'Get an Affiliate',
            version: '1.0.0',
            validation: {
                params: require('../validations/get_affiliate')
            }
        },
        middlewares.verifyToken,
        (req, res, next) =>
            serviceLocator
                .get('affiliateController')
                .getAffiliate(req, res, next)
    );

    server.get(
        {
            path: '/merchants/:id',
            name: 'Get a Merchant',
            version: '1.0.0',
            validation: {
                params: require('../validations/get_merchant')
            }
        },
        middlewares.verifyToken,
        (req, res, next) =>
            serviceLocator.get('merchantController').getMerchant(req, res, next)
    );
};
