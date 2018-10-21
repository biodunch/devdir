module.exports = (sequelize, DataTypes) => {
    const OrderStatus = sequelize.define(
        'orderStatus',
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            description: {
                type: DataTypes.STRING,
                allowNull: false
            }
        },
        {
            timestamps: true,
            underscored: true
        }
    );

    OrderStatus.associate = function(models) {
        OrderStatus.hasMany(models.Order);
    };
};
