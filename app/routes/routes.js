/**
 * @description Sets up the restify routes.
 */

'use strict';

module.exports.register = (server, serviceLocator) => {
    server.post(
        {
            path: '/contacts',
            name: 'Create Developer Contact',
            version: '1.0.0',
            validation: {
                body: require('app/validations/create_contact')
            }
        },
        (req, res, next) =>
            serviceLocator
                .get('contactsController')
                .createContact(req, res, next)
    );

    server.get(
        {
            path: '/contacts',
            name: 'Get All Contacts',
            version: '1.0.0'
        },
        (req, res, next) =>
            serviceLocator
                .get('contactsController')
                .getAllContacts(req, res, next)
    );

    server.get(
        {
            path: '/contacts/role/:title',
            name: 'Get All Contacts By Role',
            version: '1.0.0'
        },
        (req, res, next) =>
            serviceLocator
                .get('contactsController')
                .getAllContactsByRole(req, res, next)
    );

    server.get(
        {
            path: '/contacts/:twitter',
            name: 'Get A Contact',
            version: '1.0.0',
            validation: {
                params: require('app/validations/get_contact')
            }
        },
        (req, res, next) =>
            serviceLocator.get('contactsController').getContact(req, res, next)
    );

    server.put(
        {
            path: '/contacts/:twitter',
            name: 'Update A Contact',
            version: '1.0.0',
            validation: {
                body: require('app/validations/create_contact')
            }
        },
        (req, res, next) =>
            serviceLocator
                .get('contactsController')
                .updateContact(req, res, next)
    );

    server.del(
        {
            path: '/contacts/:twitter',
            name: 'Delete A Contact',
            version: '1.0.0',
            validation: {
                params: require('app/validations/get_contact')
            }
        },
        (req, res, next) =>
            serviceLocator
                .get('contactsController')
                .deleteContact(req, res, next)
    );
};
