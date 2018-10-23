'use strict';
require('dotenv').config()

const config = require('./app/configs/configs')(),
    restify = require('restify'),
    versioning = require('restify-url-semver'),
    joi = require('joi'),
    // Require DI
    serviceLocator = require('./app/configs/di'),
    validator = require('./app/lib/validator'),
    handler = require('./app/routes/handlers'),
    routes = require('./app/routes/routes'),
    logger = serviceLocator.get('logger'),
    server = restify.createServer({
        name: config.app.name || 'DevDir',
        versions: ['1.0.0'],
        formatters: {
            'application/json': require('./app/lib/formatters/jsend')
        }
    }),
    // require and initialize the database
    Database = require('./app/configs/database');
new Database(config.mongo.port, config.mongo.host, config.mongo.name);

server.pre((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    if (req.method === 'OPTIONS') {
        res.send(200, 'OK');
    } else return next();
});

// Set API versioning and allow trailing slashes
server.pre(restify.pre.sanitizePath());
server.pre(versioning({ prefix: '/' }));

// Set request handling and parsing
server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(
    restify.plugins.bodyParser({
        mapParams: false
    })
);

// initialize validator for all requests
server.use(validator.paramValidation(logger, joi));
server.use(validator.headerValidation(logger));

// Setup Error Event Handling
handler.register(server);

// Setup route Handling
routes.register(server, serviceLocator);
const port = process.env.NODE_ENV == 'test' ? '8000' : config.app.port;

// start server
server.listen(port, () => {
    logger.info(`${config.app.name} Server is running on ${port}`);

    if (process.env.APPLICATION_ENV === 'development') {
        require('./app/lib/route_tables')(server.getDebugInfo().routes);
    }
});

process.on('unhandledRejection', (error) => {
    logger.error(error);
});

module.exports = server;
