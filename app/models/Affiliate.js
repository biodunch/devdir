const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');

module.exports = (sequelize, DataTypes) => {
    const Affiliates = sequelize.define(
        'affiliate',
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

    Affiliate.prototype.comparehash = (password) => {
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

    Affiliate.beforeCreate(encryptPasswordIfChanged);
    Affiliate.beforeUpdate(encryptPasswordIfChanged);

    Affiliate.associate = function(models) {
        Affiliate.hasMany(models.AffiliateLink);
        Affiliate.hasOne(models.AffiliateWallet);
    };

    return Affiliates;
};
