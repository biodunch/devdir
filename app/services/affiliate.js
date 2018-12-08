class AffiliateService {
    constructor(log, errs, models) {
        this.log = log;
        this.errs = errs;
        this.models = models;
    }

    async fetchOne(affiliateId) {
        const Affiliate = this.models.Affiliate;
        const affiliate = await Affiliate.findOne({
            where: { id: affiliateId },
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
