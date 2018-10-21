module.exports = (sequelize, DataTypes) => {
    const AffiliateLink = sequelize.define(
        'affiliateLink',
        {
            link: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    isUrl: true
                }
            },
            count: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    isInt: true
                }
            }
        },
        {
            timestamps: true,
            underscored: true
        }
    );

    AffiliateLink.associate = function(models) {
        AffiliateLink.hasMany(models.AffiliateLinkTracking);
        AffiliateLink.hasMany(models.Order);
        AffiliateLink.belongsTo(models.Affiliate);
    };

    return AffiliateLink;
};

/** 
product_id: {
    type: DataTypes.INTEGER,
    references: {
        model: 'Product',
        key: 'id'
    }
}
*/
