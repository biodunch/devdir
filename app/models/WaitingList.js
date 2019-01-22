module.exports = (sequelize, DataTypes) => {
    const WaitingList = sequelize.define(
        'WaitingList',
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false
            }
        },
        {
            timestamps: true,
            underscored: true
        }
    );

    return WaitingList;
};
