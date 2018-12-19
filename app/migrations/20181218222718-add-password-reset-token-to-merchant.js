'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn('Merchants', 'password_reset_token', {
            type: Sequelize.STRING,
            allowNull: true
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.removeColumn('Merchants', 'password_reset_token');
    }
};
