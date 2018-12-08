class MerchantService {
    constructor(log, errs, models) {
        this.log = log;
        this.errs = errs;
        this.models = models;
    }

    async fetchOne(merchant_id) {
        const Merchant = this.models.Merchant;
        const Wallet = this.models.Wallet;
        const merchant = await Merchant.findOne({
            where: { id: merchant_id },
            include: [Wallet]
        });

        if (!merchant) {
            const err = new this.errs.NotFoundError("Merchant doesn't exists");
            this.log.error(err.message);
            return err;
        }

        return merchant;
    }
}

module.exports = MerchantService;
