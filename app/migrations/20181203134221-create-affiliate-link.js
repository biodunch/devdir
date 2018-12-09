'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('AffiliateLinks', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            link: {
                type: Sequelize.STRING,
                allowNull: false,
                validate: {
                    isUrl: true
                }
            },
            count: {
                type: Sequelize.INTEGER,
                allowNull: false,
                validate: {
                    isInt: true
                }
            },
            affiliate_id: {
                type: Sequelize.INTEGER
            },
            product_id: {
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
        return queryInterface.dropTable('AffiliateLinks');
    }
};
