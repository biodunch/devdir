class AffiliateController {
    constructor(affiliateService, log) {
        this.affiliateService = affiliateService;
        this.log = log;
    }

    async createAffiliate(req, res) {
        try {
            const { body } = req;
            const result = await this.affiliateService.create(body);
            return res.send(result);
        } catch (err) {
            console.log(err);
            this.log.error(err.message);
            return res.send(500, err);
        }
    }

    async getAffiliate(req, res) {
        try {
            const {
                params: { id }
            } = req;
            const result = await this.affiliateService.fetchOne(id);
            return res.send(result);
        } catch (err) {
            this.log.error(err.message);
            return res.send(500, err);
        }
    }
}

module.exports = AffiliateController;
