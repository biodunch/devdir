class MerchantService {
    constructor(log, errs, models) {
        this.log = log;
        this.errs = errs;
        this.models = models;
    }

    async create(body) {
        const { email } = body;
        const Merchant = this.models.Merchant;
        let merchant = await Merchant.findOne({ where: { email } });

        if (merchant) {
            const err = new this.errs.InvalidContentError(
                'Merchant with email already exists'
            );
            this.log.error(err.message);
            return err;
        }

        body.password_hash = Merchant.generateHash(body.password);
        merchant = await Merchant.create(body);
        await merchant.createMerchantWallet();
        const token = await merchant.generateToken(email);

        this.log.info(
            `Merchant - ${merchant.firstname} was created successfully `
        );
        return "success";
    }

    async fetchOne(merchant_id) {
        console.log(this.models);
        const Merchant = this.models.Merchant;
        const Wallet = this.models.Wallet;
        const merchant = await Merchant.findOne({
            where: { id: merchant_id },
            include: [Wallet],
            attributes: ['id', 'firstname', 'lastname', 'email', 'phone']
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
