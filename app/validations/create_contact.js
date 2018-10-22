'use strict';

const joi = require('joi');

module.exports = joi.object().keys({
    fullname: joi.string().min(3).max(30).required(),
    email: joi.string().email().required(),
    twitter: joi.string().min(3).max(30).required(),
    github: joi.string().min(3).max(30).required(),
    role: joi.string(),
    phone_number: joi.string(),
}).required();
