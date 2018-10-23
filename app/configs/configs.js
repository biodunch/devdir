'use strict';

module.exports = () => ({
    app: {
        name: process.env.APP_NAME || 'DevDir',
        port: process.env.PORT || 8000,
        environment: process.env.NODE_ENV,
        logpath: process.env.LOG_PATH,
    },
    mongo: {
        port: process.env.DB_PORT || '27017',
        host: process.env.DB_HOST || 'devdir_mongodb',
        name: process.env.DB_NAME,
        testDb: process.env.TEST_DB_NAME || 'test_devcenter'
    },
    application_logging: {
        file: process.env.LOG_PATH,
        level: process.env.LOG_LEVEL || 'info',
        console: process.env.NODE_ENV == 'test' ? false : process.env.LOG_ENABLE_CONSOLE 
    }
});
