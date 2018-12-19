'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn('Affiliates', 'password_reset_token', {
            type: Sequelize.STRING,
            allowNull: true
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.removeColumn('Affiliates', 'password_reset_token');
    }
};
