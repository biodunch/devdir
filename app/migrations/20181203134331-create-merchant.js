'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Merchants', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            firstname: {
                type: Sequelize.STRING,
                allowNull: false
            },
            lastname: {
                type: Sequelize.STRING,
                allowNull: false
            },
            email: {
                type: Sequelize.STRING,
                allowNull: false,
                validate: {
                    isEmail: true,
                    notEmpty: true
                }
            },
            phone: {
                type: Sequelize.STRING,
                allowNull: false
            },
            password_hash: {
                type: Sequelize.STRING,
                allowNull: false
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
        return queryInterface.dropTable('Merchants');
    }
};
