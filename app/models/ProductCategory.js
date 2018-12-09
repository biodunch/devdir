module.exports = (sequelize, DataTypes) => {
    const ProductCategory = sequelize.define(
        'ProductCategory',
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false
            }
        },
        {
            timestamps: true,
            underscored: true
        }
    );

    ProductCategory.associate = function(models) {
        ProductCategory.hasMany(models.Product);
    };

    return ProductCategory;
};
