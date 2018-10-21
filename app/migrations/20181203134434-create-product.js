'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Product', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false
            },
            description: {
                type: Sequelize.STRING,
                allowNull: false
            },
            price: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            commission: {
                type: Sequelize.INTEGER
            },
            payment_type: {
                type: Sequelize.STRING
            },
            sales_page_url: {
                type: Sequelize.STRING,
                allowNull: false,
                validate: {
                    isUrl: true
                }
            },
            thank_you_page_url: {
                type: Sequelize.STRING,
                allowNull: false,
                validate: {
                    isUrl: true
                }
            },
            payment_url: {
                type: Sequelize.STRING,
                allowNull: true,
                validate: {
                    isUrl: true,
                    notEmpty: true
                }
            },
            product_category_id: {
                type: Sequelize.INTEGER
            },
            merchant_id: {
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
        return queryInterface.dropTable('Product');
    }
};
