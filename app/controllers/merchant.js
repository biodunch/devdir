class MerchantController {
    constructor(merchantService, log) {
        this.merchantService = merchantService;
        this.log = log;
    }

    async createMerchant(req, res) {
        try {
            const { body } = req;
            const result = await this.merchantService.create(body);
            return res.send(result);
        } catch (err) {
            this.log.error(err.message);
            return res.send(500, err);
        }
        
    }

    async getMerchant(req, res) {
        try {
            const {
                params: { id }
            } = req;
            const result = await this.merchantService.fetchOne(id);
            return res.send(result);
        } catch (err) {
            this.log.error(err.message);
            return res.send(500, err);
        }
    }

    async getAllMerchant() {}
}

module.exports = MerchantController;
