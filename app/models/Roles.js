'use strict';

const serviceLocator = require('app/lib/service_locator'),
    mongoose = serviceLocator.get('mongoose');

const roleSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            trim: true,
            required: true
        },
        description: {
            type: String,
            trim: true,
            unique: true,
            lowercase: true,
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Roles', roleSchema);
