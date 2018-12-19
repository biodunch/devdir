'use strict';

const joi = require('joi');

module.exports = joi.object().keys({
    email: joi.string().email().required(),
    kind: joi.string().required()
}).required(); 