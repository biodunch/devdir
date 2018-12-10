const jwt = require('jsonwebtoken');
const config = require('app/config/configs')();
const httpStatus = require('http-status');

module.exports = {
    verifyToken: (req, res, next) => {
        let token = req.query.token || req.headers['x-access-token'];

        if (!token)
            return res.send(
                httpStatus.BAD_REQUEST,
                new Error('Provide an Access Token')
            );

        jwt.verify(token, config.app.secret, (err, decoded) => {
            if (err)
                return res.send(
                    httpStatus.BAD_REQUEST,
                    new Error('Invalid Access Token Provided')
                );

            req.user = { email: decoded.email };
        });

        return next();
    }
};
