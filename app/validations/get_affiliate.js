'use strict';

const joi = require('joi');

module.exports = {
    id: joi
        .number()
        .integer()
        .required()
};
