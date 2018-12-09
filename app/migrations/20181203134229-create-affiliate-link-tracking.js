'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('AffiliateLinkTrackings', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            arrival_time: {
                type: Sequelize.DATE,
                allowNull: false
            },
            departure_time: {
                type: Sequelize.DATE,
                allowNull: false
            },
            affiliate_link_id: {
                type: Sequelize.INTEGER
            },
            status_id: {
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
        return queryInterface.dropTable('AffiliateLinkTrackings');
    }
};
