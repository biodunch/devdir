module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define(
        'Order',
        {},
        {
            timestamps: true,
            underscored: true
        }
    );

    Order.associate = function(models) {
        Order.belongsTo(models.Buyer);
        Order.belongsTo(models.Product);
        Order.belongsTo(models.AffiliateLink);
        Order.belongsTo(models.OrderStatus);
    };

    return Order;
};
