'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn('MerchantWallets', 'merchant_id', {
            type: Sequelize.INTEGER,
            allowNull: false
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.removeColumn('MerchantWallets', 'merchant_id');
    }
};
