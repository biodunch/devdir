module.exports = (sequelize, DataTypes) => {
    const MerchantWallet = sequelize.define(
        'MerchantWallet',
        {
            amount: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0.0
            }
        },
        {
            timestamps: true,
            underscored: true
        }
    );

    MerchantWallet.associate = function(models) {
        MerchantWallet.belongsTo(models.Merchant);
        MerchantWallet.hasMany(models.MerchantWalletHistory);
    };

    return MerchantWallet;
};
