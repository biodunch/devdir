const Hashids = require('hashids');
const hashids = new Hashids()

module.exports = (sequelize, DataTypes) => {
    const WaitList = sequelize.define(
        'WaitList',
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false
            },
            rank: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            ref_link: {
                type: DataTypes.STRING,
                allowNull: true
            }
        },
        {
            timestamps: true,
            underscored: true
        }
    );

    WaitList.generateUniqueLink = function(id) {
        return hashids.encode(id)
    }
    return WaitList;
};
