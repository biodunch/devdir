module.exports = (sequelize, DataTypes) => {
    const AffiliateLinkTracking = sequelize.define(
        'AffiliateLinkTracking',
        {
            arrival_time: {
                type: DataTypes.DATE,
                allowNull: false
            },
            departure_time: {
                type: DataTypes.DATE,
                allowNull: false
            }
        },
        {
            timestamps: true,
            underscored: true
        }
    );

    AffiliateLinkTracking.associate = function(models) {
        AffiliateLinkTracking.belongsTo(models.AffiliateLink);
    };

    return AffiliateLinkTracking;
};
