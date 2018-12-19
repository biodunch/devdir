const postmark = require('postmark');
const config = require('app/config/configs')();

class EmailService {
    constructor(logs, errs) {
        this.logs = logs;
        this.errs = errs;
    }

    async sendEmail(email, subject, message) {
        const client = new postmark.Client(config.pm.key);

        client.sendEmail({
            From: 'hello@collabo.ng',
            To: 'email', // email
            Subject: subject,
            TextBody: message
        });

        return 'success';
    }
}

module.exports = EmailService;
