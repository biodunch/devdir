const serviceLocator = require('app/config/di');
const sequelize = serviceLocator.get('sequelize');

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

    Affiliate.associate = function(models) {
        Affiliate.hasMany(models.AffiliateLink);
        Affiliate.hasOne(models.AffiliateWallet);
    };

    return Affiliates;
};
