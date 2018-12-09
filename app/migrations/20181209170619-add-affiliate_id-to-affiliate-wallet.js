'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn('AffiliateWallets', 'affiliate_id', {
            type: Sequelize.INTEGER,
            allowNull: false
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.removeColumn('AffiliateWallets', 'affiliate_id');
    }
};
