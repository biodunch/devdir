module.exports.register = (server, serviceLocator) => {
    server.post(
        {
            path: '/affiliates',
            name: 'Create an Affiliate',
            version: '1.0.0',
            validation: {
                // body: require('../validations/create_contact')
            }
        },
        (req, res, next) =>
            serviceLocator
                .get('contactsController')
                .createContact(req, res, next)
    );
};
