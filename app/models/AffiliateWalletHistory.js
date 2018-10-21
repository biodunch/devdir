module.exports = (sequelize, DataTypes) => {
    const AffiliateWalletHistory = sequelize.define(
        'affiliateWalletHistory',
        {
            transaction_type: {
                type: DataTypes.STRING,
                allowNull: false
            },
            transaction_time: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW
            },
            amount: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            remarks: {
                type: DataTypes.STRING,
                allowNull: true
            }
        },
        {
            timestamps: true,
            underscored: true
        }
    );

    AffiliateWalletHistory.associate = function(AffiliateWalletHistory) {
        AffiliateWalletHistory.belongsTo(models.AffiliateWallet);
    };

    return AffiliateWalletHistory;
};
