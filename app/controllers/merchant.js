class MerchantController {
    constructor(merchantService, log) {
        this.merchantService = merchantService;
        this.log = log;
    }

    async getMerchant(req, res) {
        try {
            const {
                params: { merchant_id }
            } = req;
            const result = await this.merchantService.fetchOne(merchant_id);
            return res.send(result);
        } catch (err) {
            this.log.error(err.message);
            return res.send(500, err);
        }
    }

    async getAllMerchant() {}
}

module.exports = MerchantController;
