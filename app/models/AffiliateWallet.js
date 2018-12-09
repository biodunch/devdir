module.exports = (sequelize, DataTypes) => {
    const AffiliateWallet = sequelize.define(
        'AffiliateWallet',
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

    AffiliateWallet.associate = function(models) {
        AffiliateWallet.belongsTo(models.Affiliate);
        AffiliateWallet.hasMany(models.AffiliateWalletHistory);
    };

    return AffiliateWallet;
};
