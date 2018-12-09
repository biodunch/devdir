module.exports = (sequelize, DataTypes) => {
    const MerchantWalletHistory = sequelize.define(
        'MerchantWalletHistory',
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

    MerchantWalletHistory.associate = function(models) {
        MerchantWalletHistory.belongsTo(models.MerchantWallet);
    };

    return MerchantWalletHistory;
};
