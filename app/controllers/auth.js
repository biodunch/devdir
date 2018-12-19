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

    async forgotPassword(req, res) {
        try {
            const {
                body: { email, kind }
            } = req;
            const result = await this.authService.generatePasswordResetLink(
                email,
                kind
            );
            return res.send(result);
        } catch (err) {
            console.log(err);
            this.log.error(err.message);
            return res.send(500, err);
        }
    }

    async requestNewPassword(req, res) {
        try {
            const {
                body: { new_password, kind },
                query: { token },
                user: { email }
            } = req;
            const result = await this.authService.changePassword(
                email,
                kind,
                new_password,
                token
            );

            return res.send(result);
        } catch (err) {
            console.log(err);
            this.log.error(err.message);
            return res.send(500, err);
        }
    }
}

module.exports = AuthController;
