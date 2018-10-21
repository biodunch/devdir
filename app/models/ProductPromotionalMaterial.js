module.exports = (sequelize, DataTypes) => {
    const ProductPromotionalMaterial = sequelize.define(
        'productPromotionalMaterial',
        {
            material_url: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    isUrl: true
                }
            }
        },
        {
            timestamps: true,
            underscored: true
        }
    );

    ProductPromotionalMaterial.associate = function(models) {
        ProductPromotionalMaterial.belongsTo(models.Product);
    };

    return ProductPromotionalMaterial;
};
