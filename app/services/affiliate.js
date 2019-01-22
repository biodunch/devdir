class AffiliateService {
    constructor(log, errs, models) {
        this.log = log;
        this.errs = errs;
        this.models = models;
    }

    async create(body) {
        const { email } = body;
        const Affiliate = this.models.Affiliate;
        let affiliate = await Affiliate.findOne({ where: { email } });

        if (affiliate) {
            const err = new this.errs.InvalidContentError(
                'Affiliate with email already exists'
            );
            this.log.error(err.message);
            return err;
        }

        body.password_hash = Affiliate.generateHash(body.password);
        affiliate = await Affiliate.create(body);
        await affiliate.createAffiliateWallet();
        const token = await affiliate.generateToken(email);

        this.log.info(
            `Affiliate - ${affiliate.firstname} was created successfully `
        );
        return "success";
    }

    async fetchOne(affiliateId) {
        const Affiliate = this.models.Affiliate;
        const Wallet = this.models.Wallet;
        const affiliate = await Affiliate.findOne({
            where: { id: affiliateId },
            include: [Wallet],
            attributes: ['id', 'firstname', 'lastname', 'email', 'phone']
        });

        if (!affiliate) {
            const err = new this.errs.NotFoundError("Affiliate doesn't exists");
            this.log.error(err.message);
            return err;
        }

        return affiliate;
    }
}

module.exports = AffiliateService;
