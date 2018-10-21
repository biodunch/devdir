'use strict';

const serviceLocator = require('app/lib/service_locator');
const logger = serviceLocator.get('logger');

// Affiliate Models
const AffiliateModel = require('app/models/Affiliate/Affiliate');
const AffiliateLinkModel = require('app/models/Affiliate/AffiliateLink');
const AffiliateLinkTrackingModel = require('app/models/Affiliate/AffiliateLinkTracking');
const AffiliateWalletModel = require('app/models/Affiliate/AffiliateWallet');
const AffiliateWalletHistoryModel = require('app/models/Affiliate/AffiliateWalletHistory');

// Merchant Models
const MerchantModel = require('app/models/Merchant/Merchant');
const MerchantWalletModel = require('app/models/Merchant/MerchantWallet');
const MerchantWalletHistoryModel = require('app/models/Merchant/MerchantWalletHistory');

// Product Models
const ProductModel = require('app/models/Product/Product');
const ProductCategoryModel = require('app/models/Product/ProductCategory');
const ProductPromotionalMaterialModel = require('app/models/Product/ProductPromotionalMaterial');

// Order Model
const OrderModel = require('app/models/Order/Order');
const OrderStatusModel = require('app/models/Order/OrderStatus');

// Buyer Model
const BuyerModel = require('app/models/Buyer/Buyer');

class Database {
    constructor(host, password, username, dbName) {
        this.sequelize = serviceLocator.get('sequelize');
        this._connect(host, username, password, dbName);
    }

    _connect(host, username, password, dbName) {
        const sequelize = new this.sequelize(dbName, username, password, {
            host,
            dialect: 'mysql',

            pool: {
                max: 5,
                min: 0,
                acquire: 30000,
                idle: 10000
            },

            operatorsAliases: false
        });

        sequelize
            .authenticate()
            .then(() => {
                logger.info('Connection has been established successfully.');
            })
            .catch((err) => {
                logger.error('Unable to connect to the database:', err);
            });

        this.initializeModels(sequelize);
    }

    initializeModels(sequelize) {
        const Affiliate = AffiliateModel(sequelize, this.sequelize);
        const AffiliateLink = AffiliateLinkModel(sequelize, this.sequelize);
        const AffiliateLinkTracking = AffiliateLinkTrackingModel(
            sequelize,
            this.sequelize
        );
        const AffiliateWallet = AffiliateWalletModel(sequelize, this.sequelize);
        const AffiliateWalletHistory = AffiliateWalletHistoryModel(
            sequelize,
            this.sequelize
        );

        const Merchant = MerchantModel(sequelize, this.sequelize);
        const MerchantWallet = MerchantWalletModel(sequelize, this.sequelize);
        const MerchantWalletHistory = MerchantWalletHistoryModel(
            sequelize,
            this.sequelize
        );

        const Product = ProductModel(sequelize, this.sequelize);
        const ProductCategory = ProductCategoryModel(sequelize, this.sequelize);
        const ProductPromotionalMaterial = ProductPromotionalMaterialModel(
            sequelize,
            this.sequelize
        );

        const Order = OrderModel(sequelize, this.sequelize);
        const OrderStatus = OrderStatusModel(sequelize, this.sequelize);

        const Buyer = BuyerModel(sequelize, this.sequelize);

        // Affiliate Associations
        Affiliate.hasMany(AffiliateLink);
        AffiliateWallet.hasOne(Affiliate);
        AffiliateLink.hasMany(AffiliateLinkTracking);
        AffiliateWallet.hasMany(AffiliateWalletHistory);

        // Merchant Associations
        MerchantWallet.hasOne(Merchant);
        MerchantWallet.hasMany(MerchantWalletHistory);
        Merchant.hasMany(Product);

        // Product Associations
        Product.hasMany(Order);
        Product.hasMany(ProductPromotionalMaterial);
        Product.hasMany(AffiliateLink);
        ProductCategory.hasMany(Product);

        // Order Associations
        Order.belongsTo(AffiliateLink);
        OrderStatus.hasMany(Order);

        // Buyer Associations
        Buyer.hasMany(Order);
    }
}

module.exports = Database;
