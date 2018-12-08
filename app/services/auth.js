class AuthService {
    constructor(log, errs, models) {
        this.log = log;
        this.errs = errs;
        this.models = models;
    }

    async create(body) {
        const { kind, email } = body;
        body.password_hash = body.password;

        switch (kind) {
            case 'Merchant':
                const Merchant = this.models.Merchant;
                let merchant = await Merchant.findOne({ where: { email } });

                if (merchant) {
                    const err = new this.errs.InvalidContentError(
                        'Merchant with email already exists'
                    );
                    this.log.error(err.message);
                    return err;
                }

                merchant = await Merchant.create(body);
                const token = await merchant.generateToken(email);

                this.log.info(
                    `Merchant - ${firstname} was created successfully `
                );
                return { merchant, token };

            case 'Affiliate':
                const Affiliate = this.models.Affiliate;
                let affiliate = await Affiliate.findOne({ where: { email } });

                if (affiliate) {
                    const err = new this.errs.InvalidContentError(
                        'Affiliate with email already exists'
                    );
                    this.log.error(err.message);
                    return err;
                }

                affiliate = await Affiliate.create(body);
                const token = await affiliate.generateToken(email);

                this.log.info(
                    `Affiliate - ${firstname} was created successfully `
                );
                return { affiliate, token };
        }

        return result;
    }

    async login(body) {
        const { email, password } = body;

        switch (kind) {
            case 'Merchant':
                const Merchant = this.models.Merchant;
                let merchant = await Merchant.findOne({ where: { email } });

                if (!merchant) {
                    const err = new this.errs.NotFoundError(
                        "Merchant doesn't exists"
                    );
                    this.log.error(err.message);
                    return err;
                }

                if (!merchant.compareHash(password)) {
                    const err = new this.errs.InvalidCredentialsError(
                        'Invalid password provided'
                    );
                    this.log.error(err.message);
                    return err;
                }

                const token = await merchant.generateToken(email);
                this.log.info(
                    `Merchant - ${merchant.firstname} logged in successfully`
                );

                return { ...merchant, token };

            case 'Affiliate':
                const Affiliate = this.models.Affiliate;
                let affiliate = await Affiliate.findOne({ where: { email } });

                if (!affiliate) {
                    const err = new this.errs.NotFoundError(
                        "Affiliate doesn't exists"
                    );
                    this.log.error(err.message);
                    return err;
                }

                if (!affiliate.compareHash(password)) {
                    const err = new this.errs.InvalidCredentialsError(
                        'Invalid password provided'
                    );
                    this.log.error(err.message);
                    return err;
                }

                const token = await affiliate.generateToken(email);
                this.log.info(
                    `Affiliate - ${affiliate.firstname} logged in successfully`
                );

                return { ...affiliate, token };
        }
    }

    async forgotPassword(body) {}
}

module.exports = AuthService;
