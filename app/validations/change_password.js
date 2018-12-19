'use strict';

const joi = require('joi');

module.exports = joi.object().keys({
    new_password: joi.string().required(),
    kind: joi.string().required()
}).required(); 