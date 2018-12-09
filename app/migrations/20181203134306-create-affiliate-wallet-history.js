'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('AffiliateWalletHistories', {
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
            created_at: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updated_at: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('AffiliateWalletHistories');
    }
};
