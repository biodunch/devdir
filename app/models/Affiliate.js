const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');
const config = require('app/config/configs')();

module.exports = (sequelize, DataTypes) => {
    const Affiliate = sequelize.define(
        'Affiliate',
        {
            firstname: {
                type: DataTypes.STRING,
                allowNull: false
            },
            lastname: {
                type: DataTypes.STRING,
                allowNull: false
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    isEmail: true,
                    notEmpty: true
                },
                set(val) {
                    this.setDataValue('email', val.trim().toLowerCase());
                }
            },
            phone: {
                type: DataTypes.STRING,
                allowNull: false
            },
            password_hash: {
                type: DataTypes.STRING,
                allowNull: false
            },
            password_reset_token: {
                type: DataTypes.STRING,
                allowNull: true
            }
        },
        {
            timestamps: true,
            underscored: true
        }
    );

    const encryptPasswordIfChanged = (affiliate, options) => {
        if (affiliate.changed('password')) {
            affiliate.password_hash = bcrypt.hashSync(
                affiliate.password_hash,
                bcrypt.genSaltSync(8),
                null
            );
        }
    };

    Affiliate.generateHash = function(password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
    };

    Affiliate.prototype.compareHash = function(password) {
        return bcrypt.compareSync(password, this.password_hash);
    };

    Affiliate.prototype.generateToken = async function(email) {
        const token = await jwt.sign(
            {
                email
            },
            config.app.secret,
            {
                expiresIn: '24h'
            }
        );
        return token;
    };

    Affiliate.prototype.generatePasswordResetToken = async function(email) {
        const token = await jwt.sign(
            {
                email
            },
            config.app.secret,
            {
                expiresIn: '15m'
            }
        );
        return token;
    };

    Affiliate.beforeUpdate(encryptPasswordIfChanged);

    Affiliate.associate = function(models) {
        Affiliate.hasMany(models.AffiliateLink);
        Affiliate.hasOne(models.AffiliateWallet);
    };

    return Affiliate;
};
