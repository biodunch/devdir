'use strict';

const serviceLocator = require('app/lib/service_locator'),
    mongoose = serviceLocator.get('mongoose');

const developerSchema = new mongoose.Schema(
    {
        fullname: {
            type: String,
            trim: true,
            required: true
        },
        email: {
            type: String,
            trim: true,
            unique: true,
            lowercase: true,
            required: true
        },
        twitter: {
            type: String,
            trim: true,
            unique: true,
            lowercase: true,
            required: true
        },
        github: {
            type: String,
            trim: true,
            unique: true,
            lowercase: true,
            required: true
        },
        role: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Roles'
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Developers', developerSchema);
