'use strict';

const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, prettyPrint } = format;

/**
 * Creates transports based on config values
 * @returns {array} the created transports
 */
const createTransports = function(config) {
    const customTransports = [];

    // setup the file transport
    if (config.file) {
        // setup the log transport
        customTransports.push(
            new transports.File({
                filename: config.file,
                level: config.level
            })
        );
    }

    // if config.console is set to true, a console logger will be included.
    if (config.console) {
        customTransports.push(
            new transports.Console({
                level: config.level
            })
        );
    }

    return customTransports;
};

module.exports = {
    /**
     * Creates a new logger instance using the config provided.
     * @param  {object} config The config used to setup the logger transports.
     * @return {logger} Returns a new instance of the winston logger.
     */
    create: function(config) {
        return new createLogger({
            transports: createTransports(config),
            json: false,
            format: combine(
                label({ label: 'Body101 MW' }),
                timestamp(),
                prettyPrint()
            )
        });
    }
};
