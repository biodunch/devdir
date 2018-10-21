module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define(
        'product',
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            description: {
                type: DataTypes.STRING,
                allowNull: false
            },
            price: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            commission: {
                type: DataTypes.INTEGER
            },
            payment_type: {
                type: DataTypes.STRING
            },
            sales_page_url: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    isUrl: true
                }
            },
            thank_you_page_url: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    isUrl: true
                }
            },
            payment_url: {
                type: DataTypes.STRING,
                allowNull: true,
                validate: {
                    isUrl: true,
                    notEmpty: true
                }
            }
        },
        {
            timestamps: true,
            underscored: true
        }
    );

    Product.associate = function(models) {
        Product.hasMany(models.Order);
        Product.hasMany(models.ProductPromotionalMaterial);
        Product.hasMany(models.AffiliateLink);
        Product.belongsTo(models.Merchant);
        Product.belongsTo(models.ProductCategory);
    };

    return Product;
};
