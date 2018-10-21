module.exports = (sequelize, DataTypes) => {
    const Merchant = sequelize.define(
        'merchant',
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

    Merchant.associate = function(models) {
        Merchant.hasOne(models.MerchantWallet);
        Merchant.hasMany(models.Product);
    };

    return Merchant;
};
