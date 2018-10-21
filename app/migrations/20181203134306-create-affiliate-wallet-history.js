'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('AffiliateWalletHistory', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            transaction_type: {
                type: Sequelize.STRING,
                allowNull: false
            },
            transaction_time: {
                type: Sequelize.DATE,
                defaultValue: Sequelize.NOW
            },
            amount: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            remarks: {
                type: Sequelize.STRING,
                allowNull: true
            },
            wallet_id: {
                type: Sequelize.INTEGER
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('AffiliateWalletHistory');
    }
};
