const joi = require('joi');

module.exports = joi
    .object()
    .keys({
        email: joi.string().email(),
        twitter: joi.string(),
        github: joi.string()
    })
    .xor('email', 'twitter', 'github')
    .required();
