const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');
const config = require('app/config/configs')();

module.exports = (sequelize, DataTypes) => {
    const Merchant = sequelize.define(
        'Merchant',
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

    const encryptPasswordIfChanged = (merchant, options) => {
        if (merchant.changed('password')) {
            merchant.password_hash = bcrypt.hashSync(
                merchant.password_hash,
                bcrypt.genSaltSync(8),
                null
            );
        }
    };

    Merchant.generateHash = function(password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
    };

    Merchant.prototype.compareHash = function(password) {
        return bcrypt.compareSync(password, this.password_hash);
    };

    Merchant.prototype.generateToken = async function(email) {
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

    Merchant.prototype.generatePasswordResetToken = async function(email) {
        const token = await jwt.sign(
            {
                email
            },
            config.app.secret,
            {
                expiresIn: '5m'
            }
        );
        return token;
    };

    Merchant.beforeUpdate(encryptPasswordIfChanged);

    Merchant.associate = function(models) {
        Merchant.hasOne(models.MerchantWallet);
        Merchant.hasMany(models.Product);
    };

    return Merchant;
};
