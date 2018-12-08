class AffiliateController {
    constructor(affiliateService, log) {
        this.affiliateService = affiliateService;
        this.log = log;
    }

    async getAffiliate(req, res) {
        try {
            const { params: {affiliate_id} } = req;
            const result = await this.affiliateService.fetchOne(affiliate_id);
            return res.send(result);
        } catch (err) {
            this.log.error(err.message);
            return res.send(500, err);
        }
    }
}

module.exports = AffiliateController;
