'use strict';

const config = require('app/config/configs')();
const restify = require('restify');
const versioning = require('restify-url-semver');
const joi = require('joi');
const serviceLocator = require('app/config/di');
const validator = require('app/lib/validator');
const handler = require('app/routes/handlers');
const routes = require('app/routes/routes');
const logger = serviceLocator.get('logger');

const server = restify.createServer({
    name: config.app.name,
    versions: ['1.0.0'],
    formatters: {
        'application/json': require('app/lib/formatters/jsend')
    }
});

// Setup CORS Middleware
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

// start server
server.listen(config.app.port, () => {
    logger.info(`${config.app.name} Server is running on ${config.app.port}`);

    if (process.env.NODE_ENV === 'development') {
        require('app/lib/route_tables')(server.getDebugInfo().routes);
    }
});

process.on('unhandledRejection', (error) => {
    logger.error(error);
});
