'use strict';

const serviceLocator = require('../lib/service_locator'),
    logger = serviceLocator.get('logger'),
    configs = require('./configs')();

class Database {
    constructor(port, host, name) {
        this.mongoose = serviceLocator.get('mongoose');
        name = process.env.NODE_ENV === 'test' ? configs.mongo.testDb : name;
        this._connect(host, port, name);
    }

    _connect(host, port, name) {
        this.mongoose.Promise = global.Promise;
        this.mongoose.connect(`mongodb://${host}:${port}/${name}`);
        const { connection } = this.mongoose;
        connection.on('connected', () =>
            logger.info('Database Connection was Successful')
        );
        connection.on('error', (err) =>
            logger.info('Database Connection Failed' + err)
        );
        connection.on('disconnected', () =>
            logger.info('Database Connection Disconnected')
        );
        process.on('SIGINT', () => {
            connection.close();
            logger.info(
                'Database Connection closed due to NodeJs process termination'
            );
            process.exit(0);
        });

        // initialize Models
        require('../models/Roles');
        require('../models/DevelopersContact');
    }
}

module.exports = Database;
