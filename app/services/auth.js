class AuthService {
    constructor(log, errs, models, emailService) {
        this.log = log;
        this.errs = errs;
        this.models = models;
        this.emailService = emailService;
    }

    async login(body) {
        const { email, password, kind } = body;
        const Model = this.models[kind];
        let model = await Model.findOne({ where: { email } });

        if (!model) {
            const err = new this.errs.NotFoundError(
                Model.name + " doesn't exists"
            );
            this.log.error(err.message);
            return err;
        }

        if (!model.compareHash(password)) {
            const err = new this.errs.InvalidCredentialsError(
                'Invalid password provided'
            );
            this.log.error(err.message);
            return err;
        }

        const token = await model.generateToken(email);
        this.log.info(
            `${Model.name} - ${model.firstname} logged in successfully`
        );

        return { model, token };
    }

    async generatePasswordResetLink(email, kind) {
        const Model = this.models[kind];
        const model = await Model.findOne({ where: { email } });

        if (!model) {
            const err = new this.errs.NotFoundError(Model + " doesn't exists");
            this.log.error(err.message);
            return err;
        }
        const passwordResetToken = await model.generatePasswordResetToken(
            email
        );
        model.password_reset_token = passwordResetToken;
        await model.save();
        const message = `To reset your password, click on this link: https://collabo.ng/reset-password/${passwordResetToken}`;
        await this.emailService.sendEmail(
            email,
            'Password Reset Request',
            message
        );
        return 'Email sent! Click the link in the email within 5 minutes to reset your password';
    }

    async changePassword(email, kind, newPassword, passwordResetToken) {
        const Model = this.models[kind];
        const model = await Model.findOne({
            where: { email }
        });

        if (!model) {
            const err = new this.errs.NotFoundError("Affiliate doesn't exists");
            this.log.error(err.message);
            return err;
        }

        const checkToken = model.password_reset_token === passwordResetToken;

        if (!checkToken) {
            const err = new this.errs.InvalidCredentialsError(
                'Invalid Password Reset Link used'
            );
            this.log.error(err.message);
            return err;
        }

        model.password_hash = await Model.generateHash(newPassword);
        await model.save();
        await this.emailService.sendEmail(
            email,
            'Password Reset Request Successful',
            'Your password has been changed successfully, kindly visit our website again and login with your new password. Thanks - Biodun'
        );
        const token = await model.generateToken(email);
        return { model, token };
    }
}

module.exports = AuthService;
