module.exports = (sequelize, DataTypes) => {
    const Buyer = sequelize.define(
        'Buyer',
        {
            firstname: {
                type: DataTypes.STRING,
                allowNull: false
            },
            lastname: {
                type: DataTypes.STRING,
                allowNull: false
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    isEmail: true,
                    notEmpty: true
                },
                set(val) {
                    this.setDataValue('email', val.trim().toLowerCase());
                }
            },
            phone: {
                type: DataTypes.STRING,
                allowNull: false
            }
        },
        {
            timestamps: true,
            underscored: true
        }
    );

    Buyer.associate = function(models) {
        Buyer.hasMany(models.Order);
    };

    return Buyer;
};
