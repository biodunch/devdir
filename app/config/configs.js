'use strict';

module.exports = () => ({
    app: {
        name: process.env.APP_NAME,
        port: process.env.PORT || 8000,
        env: process.env.NODE_ENV,
        logpath: process.env.LOG_PATH,
        secret: process.env.APP_SECRET
    },
    mysql: {
        password: process.env.DB_PASSWORD,
        username: process.env.DB_USERNAME,
        host: process.env.DB_HOST,
        dbName: process.env.DB_NAME
    },
    application_logging: {
        file: process.env.LOG_PATH,
        level: process.env.LOG_LEVEL || 'info',
        console: process.env.LOG_ENABLE_CONSOLE || true
    }
});
