class AuthController {
    constructor(authService, log) {
        this.authService = authService;
        this.log = log;
    }

    createMerchant(req, res) {
        try {
            const { body } = req;
            const result = await this.authService.create(body);
            return res.send(result);
        } catch (err) {
            this.log.error(err.message);
            return res.send(500, err);
        }
    }

    createAffiliate(req, res) {
        try {
            const { body } = req;
            const result = await this.authService.create(body);
            return res.send(result);
        } catch (err) {
            this.log.error(err.message);
            return res.send(500, err);
        }
    }

    basicLogin() {}

    getAffiliate() {}
}

module.exports = AuthController;
