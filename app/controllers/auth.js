class AuthController {
    constructor(authService, log) {
        this.authService = authService;
        this.log = log;
    }

    async basicLogin(req, res) {
        try {
            const { body } = req;
            const result = await this.authService.login(body);
            return res.send(result);
        } catch (err) {
            console.log(err);
            this.log.error(err.message);
            return res.send(500, err);
        }
    }

    getAffiliate() {}
}

module.exports = AuthController;
